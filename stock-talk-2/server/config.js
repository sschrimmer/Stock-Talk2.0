// server/src/config.js
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI 
  || 'mongodb://127.0.0.1:27017/stockTalk2');

module.exports = mongoose.connection;


// Dont know if this was still needed
// module.exports = {
//     jwtSecret: '',
//     mongoURI: '', 
//     port: process.env.PORT || 4000,
//   };
  