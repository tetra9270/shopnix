const { protect, admin } = require('../middleware/authMiddleware');

const {
    authUser,
    registerUser,
    getUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    getUsers,
    deleteUser
} = require('../controllers/userController');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);

// Protected routes (require login)
router.get('/profile', protect, getUserProfile);
router.post('/address', protect, addAddress);
router.put('/address/:id', protect, updateAddress);
router.delete('/address/:id', protect, deleteAddress);

// Admin routes
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
