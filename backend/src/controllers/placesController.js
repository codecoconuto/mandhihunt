
const mapsService = require('../services/googleMapsService');
const logger = require('../utils/logger');

exports.getPlaces = async (req, res, next) => {
    try {
        const { q, lat, lng } = req.query;
        let places = [];

        if (lat && lng) {
            places = await mapsService.getNearbyPlaces(lat, lng);
        } else if (q) {
            places = await mapsService.searchPlaces(q);
        } else {
            return res.status(400).json({ status: 'fail', message: "Provide 'q' or 'lat'/'lng'" });
        }

        // Add proper thumbnail URLs for client
        const protocol = req.protocol;
        const host = req.get('host');
        
        const responsePlaces = places.map(place => ({
            ...place,
            thumbnailUrl: place.originalPhotoRef 
                ? `${protocol}://${host}/api/v1/photo?ref=${place.originalPhotoRef}` 
                : "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800"
        }));

        res.status(200).json({
            status: 'success',
            results: responsePlaces.length,
            data: responsePlaces
        });
    } catch (error) {
        next(error);
    }
};

exports.getPhoto = async (req, res, next) => {
    try {
        const { ref } = req.query;
        if (!ref) return res.status(400).send("Missing reference");

        // Fetch image stream from Google
        const response = await mapsService.getPhotoStream(ref);

        // FIX: Explicitly tell browser this resource is safe to use cross-origin
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', response.headers['content-type'] || 'image/jpeg');

        response.data.pipe(res);
    } catch (error) {
        logger.error(`Photo Controller Error: ${error.message}`);
        // Return a fallback image instead of breaking the UI
        res.redirect("https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800");
    }
};
