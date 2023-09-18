const mongoose = require('mongoose');

// Database connection configuration
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stockTalk2',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// JWT secret key configuration
module.exports = {
  jwtSecret: 'tester', // Replace 'your_secret_key_here' with your actual secret key
};

// Dont know if this was still needed
// module.exports = {
//     jwtSecret: '',
//     mongoURI: '', 
//     port: process.env.PORT || 4000,
//   };
  