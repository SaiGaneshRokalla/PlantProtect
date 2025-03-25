const userModel = require('../models/userModel'); // Import the userModel

// Update Profile
exports.updateProfile = (req, res) => {
  const userId = req.session.user.id;
  const updatedData = {
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    gender: req.body.gender,
  };

  userModel.updateUser(userId, updatedData, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/config');
    }
    res.redirect('/profile');
  });
};