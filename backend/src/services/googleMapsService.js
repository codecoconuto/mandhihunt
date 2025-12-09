
const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');

// UTILITY: Format Address to "Locality, District, Kerala"
const formatKeralaAddress = (place) => {
    let locality = '';
    let district = '';
    const state = 'Kerala';

    // 1. Try extracting from structured address_components (Best Accuracy)
    if (place.address_components) {
        const getComponent = (types) => {
            const cmp = place.address_components.find(c => types.some(t => c.types.includes(t)));
            return cmp ? cmp.long_name : null;
        };

        // Hierarchy for Locality: locality > sublocality > neighborhood
        locality = getComponent(['locality']) || 
                   getComponent(['sublocality', 'sublocality_level_1']) || 
                   getComponent(['neighborhood', 'administrative_area_level_3']) || '';

        // Hierarchy for District: administrative_area_level_2
        district = getComponent(['administrative_area_level_2']) || '';
    }

    // 2. Fallback: Parse formatted_address string if structured data failed
    if (!locality || !district) {
        const rawAddress = place.formatted_address || place.vicinity || "";
        const parts = rawAddress.split(',').map(p => p.trim());
        
        // Filter out unwanted parts like Pincodes, Country, State if we already know it
        const cleanParts = parts.filter(p => {
            const lower = p.toLowerCase();
            return !lower.includes('india') && 
                   !lower.includes('kerala') && 
                   !/^\d{6}$/.test(p); // Remove pincodes
        });

        if (!locality && cleanParts.length > 0) locality = cleanParts[0];
        if (!district && cleanParts.length > 1) district = cleanParts[1];
    }

    // 3. Clean up duplicates (e.g. if Locality == District)
    if (locality === district) district = '';

    // 4. Construct Final String
    const addressParts = [];
    if (locality) addressParts.push(locality);
    if (district) addressParts.push(district);
    addressParts.push(state);

    return addressParts.join(', ');
};

// Deterministic Enrichment Logic (The "Mandi-fier")
const enrichPlaceData = (place) => {
    // Create seed from Place ID
    const seedStr = place.place_id || place.name;
    const seed = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const dishes = [
        "Kuzhimanthi", "Honey Glazed Alfaham", "Peri Peri Alfaham", 
        "Beef Mandi", "Madghout", "Kabsa", "Mutton Mandi", 
        "Schezwan Alfaham", "Mexican Alfaham", "Kanthari Alfaham"
    ];
    const signatureDish = dishes[seed % dishes.length];

    const spiceLevels = ['MILD', 'MEDIUM', 'SPICY', 'EXTREME'];
    const spice = spiceLevels[seed % 4];

    const priceRange = seed % 3 === 0 ? "₹350-700" : (seed % 2 === 0 ? "₹450-900" : "₹500-1200");

    const totalReviews = place.user_ratings_total || 0;
    let crowd = 'QUIET';
    if (totalReviews > 1500) crowd = 'VERY_BUSY';
    else if (totalReviews > 500) crowd = 'BUSY';
    else if (totalReviews > 100) crowd = 'MODERATE';

    // Use the new Address Formatter
    const cleanAddress = formatKeralaAddress(place);
    
    // Extract simple village name for short display contexts
    const addressParts = cleanAddress.split(',');
    const simpleVillage = addressParts[0]; 
    const simpleDistrict = addressParts.length > 1 ? addressParts[1].trim() : "";

    return {
        id: place.place_id,
        name: place.name,
        formattedAddress: cleanAddress, // New Field
        village: simpleVillage,        // Keep for backward compat / short display
        district: simpleDistrict,      // Keep for backward compat
        coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
        },
        rating: place.rating || 4.0,
        reviewCount: place.user_ratings_total || 0,
        signatureDish,
        priceRange,
        spiceLevel: spice,
        portionSizes: ['SINGLE', 'COUPLE', 'FAMILY'],
        crowdStatus: crowd,
        phoneNumber: "Contact via Maps", 
        isOpen: place.opening_hours ? place.opening_hours.open_now : true,
        description: `A highly rated spot in ${simpleVillage}. Famous for their ${signatureDish}.`,
        menuHighlights: [
            { name: "Full Mandi", price: 780, description: "Serves 4", isBestseller: true },
            { name: "Half Mandi", price: 400, description: "Serves 2" },
            { name: "Quarter Mandi", price: 210, description: "Single Portion" }
        ],
        reviews: [
            { user: "Foodie", rating: 5, comment: "Check Google Maps for the latest reviews.", date: "Recent" }
        ],
        originalPhotoRef: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
    };
};

// Check if a place is likely in Kerala based on Lat/Lng bounds
// Approx Bounds: Lat 8.1 - 12.8, Lng 74.8 - 77.5
const isInsideKerala = (lat, lng) => {
    if (!lat || !lng) return false;
    return (lat >= 8.0 && lat <= 13.0 && lng >= 74.0 && lng <= 78.0);
};

exports.searchPlaces = async (query) => {
    if (!query) throw new Error('Query is required');
    
    // 1. Force strict "Kerala" context in the search query
    let cleanQuery = query.toLowerCase().replace(/kerala/g, '').trim();
    if (!cleanQuery.includes('mandi')) cleanQuery += ' Mandi';
    const searchQuery = `${cleanQuery} Kerala`;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&type=restaurant&key=${config.googleMapsKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
             throw new Error(`Google API Status: ${response.data.status}`);
        }

        const rawResults = response.data.results || [];
        
        // 2. Strict Filtering: Result MUST be in Kerala
        const keralaResults = rawResults.filter(place => {
            const address = (place.formatted_address || "").toLowerCase();
            if (address.includes('kerala')) return true;

            const lat = place.geometry?.location?.lat;
            const lng = place.geometry?.location?.lng;
            return isInsideKerala(lat, lng);
        });

        return keralaResults.map(enrichPlaceData);
    } catch (error) {
        logger.error(`Google Maps Search Error: ${error.message}`);
        throw error;
    }
};

exports.getNearbyPlaces = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&keyword=mandi&key=${config.googleMapsKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
             throw new Error(`Google API Status: ${response.data.status}`);
        }
        return (response.data.results || []).map(enrichPlaceData);
    } catch (error) {
        logger.error(`Google Maps Nearby Error: ${error.message}`);
        throw error;
    }
};

exports.getPhotoStream = async (photoRef) => {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${config.googleMapsKey}`;
    return axios({
        url: photoUrl,
        method: 'GET',
        responseType: 'stream'
    });
};
