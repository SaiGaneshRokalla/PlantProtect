const userModel = require('../models/userModel');

exports.getProfile = (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ user: req.session.user });
};

exports.renderUpdateRole = (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
  res.render('updateRole', { user: req.session.user });
};

exports.updateRole = (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
      return res.status(400).send("Invalid role selected");
  }
  
  // Update the user role in the session
  req.session.user.role = role;

  // Optionally, update the user role in the database
  userModel.updateUserRole(req.session.user.id, role, (err) => {
    if (err) {
      return res.status(500).send("Failed to update role");
    }
    // Redirect to the profile page to show the updated profile
    res.redirect('/profile');
  });
};
