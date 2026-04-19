const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const mongoose = require('mongoose');

// @desc    Auth user & get token
// @route   POST /api/users/login
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('authUser error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('registerUser error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('getUserProfile error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add address to user (uses raw MongoDB collection to bypass pre-save hooks)
// @route   POST /api/users/address
const addAddress = async (req, res) => {
    try {
        const { fullName, phone, address, city, postalCode, country, isDefault } = req.body;
        const userId = req.user._id;

        // Count existing addresses
        const userDoc = await User.findById(userId).select('addresses').lean();
        if (!userDoc) return res.status(404).json({ message: 'User not found' });

        const shouldBeDefault = Boolean(isDefault) || userDoc.addresses.length === 0;

        const newAddr = {
            _id: new mongoose.Types.ObjectId(),
            fullName: fullName || '',
            phone: phone || '',
            address: address || '',
            city: city || '',
            postalCode: postalCode || '',
            country: country || 'Pakistan',
            isDefault: shouldBeDefault,
        };

        // Use raw MongoDB operations to bypass Mongoose pre-save hooks
        const col = User.collection;
        await col.updateOne({ _id: userId }, { $push: { addresses: newAddr } });

        const updated = await User.findById(userId).select('addresses').lean();
        return res.status(201).json(updated.addresses);
    } catch (err) {
        console.error('addAddress ERR:', err.message, err.stack);
        return res.status(500).json({ message: err.message || 'Server error' });
    }
};

// @desc    Update an address
// @route   PUT /api/users/address/:id
const updateAddress = async (req, res) => {
    try {
        const { fullName, phone, address, city, postalCode, country, isDefault } = req.body;
        const addressId = new mongoose.Types.ObjectId(req.params.id);
        const userId = req.user._id;

        const col = User.collection;

        // If setting as default, clear all other defaults
        if (isDefault) {
            await col.updateOne({ _id: userId }, { $set: { 'addresses.$[].isDefault': false } });
        }

        // Update the specific address
        await col.updateOne(
            { _id: userId, 'addresses._id': addressId },
            {
                $set: {
                    'addresses.$.fullName': fullName,
                    'addresses.$.phone': phone,
                    'addresses.$.address': address,
                    'addresses.$.city': city,
                    'addresses.$.postalCode': postalCode,
                    'addresses.$.country': country || 'Pakistan',
                    'addresses.$.isDefault': Boolean(isDefault),
                }
            }
        );

        const updated = await User.findById(userId).select('addresses').lean();
        return res.json(updated.addresses);
    } catch (err) {
        console.error('updateAddress ERR:', err.message);
        return res.status(500).json({ message: err.message || 'Server error' });
    }
};

// @desc    Delete an address
// @route   DELETE /api/users/address/:id
const deleteAddress = async (req, res) => {
    try {
        const addressId = new mongoose.Types.ObjectId(req.params.id);
        const userId = req.user._id;

        await User.collection.updateOne(
            { _id: userId },
            { $pull: { addresses: { _id: addressId } } }
        );

        const updated = await User.findById(userId).select('addresses').lean();
        return res.json(updated.addresses);
    } catch (err) {
        console.error('deleteAddress ERR:', err.message);
        return res.status(500).json({ message: err.message || 'Server error' });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin) {
                return res.status(400).json({ message: 'Cannot delete admin user' });
            }
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    getUsers,
    deleteUser
};
