const db = require('../config/db'); // db connection
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register User
exports.register = (req, res) => {
  const { name, phone, email, password, gender, location } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  userModel.registerUser(name, phone, email, hashedPassword, gender, location, (err, result) => {
    if (err) {
      console.error(err);
      return res.redirect('/register');
    }
    res.redirect('/login');
  });
};

// Login User
exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, user) => {
    if (err || !user) {
      console.error('User not found or error:', err);
      return res.redirect('/login');
    }

    // Log the values of password and user.password
    console.log('Password:', password);
    console.log('User password:', user.password);

    // Ensure that both password and user.password are defined
    if (!password || !user.password) {
      console.error('Password or user password is undefined');
      return res.redirect('/login');
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.redirect('/upload');
    } else {
      res.redirect('/login');
    }
  });
};

// Get User Profile
exports.getProfile = (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ user: req.session.user });
};

// Update User Role (For Admin)
exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  userModel.updateUserRole(id, role, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "User role updated successfully" });
  });
};

// Logout User
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
};

module.exports = exports;