const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const updateRoleController = require('../controllers/updateRoleController');
const router = express.Router();

router.post('/config', ensureAuthenticated, updateRoleController.updateProfile);

module.exports = router;