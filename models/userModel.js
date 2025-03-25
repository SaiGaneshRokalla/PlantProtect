const db = require('../config/db'); // Correctly reference the db module

exports.registerUser = (name, phone, email, password, gender, location, callback) => {
  const role = 'user'; 
  const query = 'INSERT INTO users (name, phone, email, password, gender, location, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, phone, email, password, gender, location, role], callback);
};

exports.findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.length > 0 ? results[0] : null);
  });
};

exports.findUserById = (id, callback) => {
  const query = 'SELECT id, name, email, phone, role, gender, location FROM users WHERE id = ?';
  db.query(query, [id], callback);
};

exports.getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [results] = await db.query(query);
  return results; 
};

exports.getUsers = (callback) => {
  const query = 'SELECT id, name, email, phone, role, gender, location FROM users';
  db.query(query, callback);
};

exports.updateUser = (userId, updatedData, callback) => {
  const query = 'UPDATE users SET name = ?, phone = ?, location = ?, gender = ? WHERE id = ?';
  const values = [
    updatedData.name || null, 
    updatedData.phone || null, 
    updatedData.location || null, 
    updatedData.gender || null, 
    userId
  ];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Corrected updateUserRole function
exports.updateUserRole = (userId, role, callback) => {
  const query = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(query, [role, userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.deleteUser = (id, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], callback);
};
