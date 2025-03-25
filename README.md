# SignSense: AI Hand Gesture-Based Language Interpreter  

## 🚀 Introduction  
**AgroGuard** is an AI-powered smart crop disease detection system that analyzes plant images to identify diseases instantly. Using advanced machine learning and computer vision, it helps farmers take proactive measures, ensuring healthier crops and improved yields. 🚜🌱

## 🎯 Features  
- **AI-Powered Crop Disease Detection** – Upload a crop image, and the system identifies the most likely disease using advanced machine learning.  
- **Detailed Disease Insights** – Displays disease names, including **scientific names**, along with confidence scores.  
- **Comprehensive Metrics** – Provides probability-based analysis to help farmers make informed decisions.  
- **Credit-Based Usage System** – Every detection deducts a credit, ensuring fair and controlled access.  
- **Real-Time Analytics** – Tracks usage history, credit deductions, and detection trends.  
- **Sleek & Responsive UI** – Designed with **Tailwind CSS** for a modern and intuitive experience. 🚜🌱  

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Frontend:** Tailwind CSS, Alpine.js  
- **Database:** MySQL  
- **Authentication & Roles:** Csurf, Express Session  

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/signsense.git  
cd signsense
```

### 2️⃣ Setup Database Credentials
```sh
const mysql = require('mysql2');

const db = mysql
  .createPool({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databasename',
  })
  .promise();

module.exports = db;
```

### 3️⃣ Setup Database
```sh
-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ Start the Server
```sh
node app.js
```
