const express = require('express');
const upload = require('../middleware/upload');
const { detectDisease } = require('../controllers/imageController');

const router = express.Router();

// Route to render the upload page
router.get('/upload', (req, res) => {
    const user = req.session.user;
    res.render('upload', { user });
});

// Route to handle file upload and disease detection
router.post('/upload', upload.single('image'), detectDisease);

module.exports = router;