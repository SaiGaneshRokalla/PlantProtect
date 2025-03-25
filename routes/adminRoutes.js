const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', ensureAuthenticated, adminController.adminPage);
router.post('/admin/edit/:id', ensureAuthenticated, adminController.editUser);
router.post('/admin/delete/:id', ensureAuthenticated, adminController.deleteUser);

module.exports = router;
