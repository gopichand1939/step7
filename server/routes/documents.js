const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: './uploads/', // This path should be relative to the server directory
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // Limit to 1MB
}).single('file');

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(400).json({ success: false, message: 'File upload failed' });
        }
        console.log('File uploaded successfully:', req.file);
        res.json({ success: true, message: 'File uploaded successfully' });
    });
});

module.exports = router;
