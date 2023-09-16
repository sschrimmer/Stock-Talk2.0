const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Middleware to verify JWT and authenticate users
const authMiddleware = async (req, res, next) => {
  // Get the JWT token from the request header (e.g., "Authorization: Bearer <token>")
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token with your secret key
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find the user based on the decoded user ID
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the authenticated user to the request object
    req.user = user;
    next(); // Continue with the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
