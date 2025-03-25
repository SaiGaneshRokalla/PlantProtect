const userModel = require('../models/userModel');

exports.adminPage = (req, res) => {
  const user = req.session.user || null;

  if (user.role === 'user') {
    return res.redirect('/');
  }

  userModel.getUsers((err, results) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }

    res.render('admin', { users: results, user });
  });
};

exports.editUserPage = (req, res) => {
  const userId = req.params.id;
  userModel.findUserById(userId, (err, user) => {
    if (err || !user) {
      console.error(err);
      return res.redirect('/admin');
    }
    res.render('editUser', { user });
  });
};

exports.editUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = {
    role: req.body.role,
  };
  userModel.updateUser(userId, updatedData, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/admin');
    }
    res.redirect('/admin');
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  userModel.deleteUser(userId, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/admin');
    }
    res.redirect('/admin');
  });
};
