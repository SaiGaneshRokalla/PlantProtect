const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const updateRoleRoutes = require('./routes/updateRoleRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { detectDisease, uploadImage } = require('./controllers/imageController'); // Correctly reference the detectDisease and uploadImage functions

const app = express();
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files statically

// Routes
app.use('/', authRoutes);
app.use('/', imageRoutes);
app.use('/', updateRoleRoutes);
app.use('/', adminRoutes);

// Additional routes for uploading and detecting disease
app.get('/', uploadImage);
app.post('/detect', upload.single('image'), detectDisease);

// Error handling
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
