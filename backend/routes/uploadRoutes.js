const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Configure Cloudinary using env vars
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Cloudinary as storage engine — no local disk needed
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shopnix-products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
    },
});

const upload = multer({ storage });

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', upload.array('images', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Cloudinary returns secure_url — full HTTPS URL, works everywhere
        const imageUrls = req.files.map(file => file.path);
        res.json({
            message: 'Images Uploaded',
            images: imageUrls
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
