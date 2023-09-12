const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    //  queries here
  },
  Mutation: {
    // mutations here
  },
};

module.exports = resolvers;
