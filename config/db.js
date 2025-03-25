const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'root', // Replace with your database user
  password: 'Sai@22003', // Replace with your database password
  database: 'argo' // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;