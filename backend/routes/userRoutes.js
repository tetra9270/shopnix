const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    addAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);

// Protected routes (require login)
router.get('/profile', protect, getUserProfile);
router.post('/address', protect, addAddress);
router.put('/address/:id', protect, updateAddress);
router.delete('/address/:id', protect, deleteAddress);

module.exports = router;
