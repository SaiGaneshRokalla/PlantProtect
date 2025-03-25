const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const adminController = require('../controllers/adminController');
const updateRoleController = require('../controllers/updateRoleController');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/profile', ensureAuthenticated, profileController.getProfile);
router.get('/admin', ensureAuthenticated, adminController.adminPage);

// Settings
router.get('/updateRole', ensureAuthenticated, profileController.renderUpdateRole);
router.post('/updateRole', ensureAuthenticated, updateRoleController.updateProfile);

// Admin routes for editing and deleting users
router.get('/admin/edit/:id', ensureAuthenticated, adminController.editUserPage);
router.post('/admin/edit/:id', ensureAuthenticated, adminController.editUser);
router.post('/admin/delete/:id', ensureAuthenticated, adminController.deleteUser);

module.exports = router;