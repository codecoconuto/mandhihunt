
const express = require('express');
const placesController = require('../../controllers/placesController');
const chatController = require('../../controllers/chatController');
const authController = require('../../controllers/authController');
const adminController = require('../../controllers/adminController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// --- PUBLIC ROUTES ---
router.use(authMiddleware.requireClientKey);

router.get('/places', placesController.getPlaces);
router.get('/photo', placesController.getPhoto);
router.post('/chat', chatController.chat);
router.post('/auth/login', authController.login);

// --- ADMIN ROUTES ---
router.use('/admin', authMiddleware.protect, authMiddleware.restrictTo('admin', 'moderator'));

router.get('/admin/stats', adminController.getStats);

// Shop Management
router.get('/admin/shops', adminController.getAllShops);
router.post('/admin/shops', adminController.createShop); // New
router.put('/admin/shops/:id', adminController.updateShop); // New
router.delete('/admin/shops/:id', adminController.deleteShop);
router.put('/admin/shops/:id/status', adminController.updateShopStatus);

// User Management
router.get('/admin/users', adminController.getAllUsers);
router.put('/admin/users/:id/status', adminController.updateUserStatus);

// Reviews
router.get('/admin/reviews', adminController.getAllReviews);
router.delete('/admin/reviews/:id', adminController.deleteReview);

// System
router.get('/admin/logs', adminController.getSystemLogs);
router.get('/admin/settings', adminController.getSettings);
router.post('/admin/settings', adminController.updateSettings);

module.exports = router;
