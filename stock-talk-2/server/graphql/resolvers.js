const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },

    getAllPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error('Error fetching posts');
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return user;
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    
    createPost: async (_, { title, content, userId }) => {
      try {
        const post = new Post({ title, content, userId });
        await post.save();
        return post;
      } catch (error) {
        throw new Error('Error creating post');
      }
    },
  },
};

module.exports = resolvers;
