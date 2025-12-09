
const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');

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

    // Parse Address for nicer display
    const addressComponents = (place.formatted_address || place.vicinity || "").split(',');
    const district = addressComponents.length > 2 ? addressComponents[addressComponents.length - 2].trim() : "Kerala";
    const village = addressComponents[0].trim();

    return {
        id: place.place_id,
        name: place.name,
        village: village,
        district: district,
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
        description: `A highly rated spot in ${village}. Famous for their ${signatureDish}.`,
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
    // Remove 'kerala' if present to avoid duplication, then append it strictly
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
            
            // Check text address first
            if (address.includes('kerala')) return true;

            // Check geo-bounds if address is vague
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
    // For "Near Me", we trust the user's location, but we still strictly search for Mandi
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
