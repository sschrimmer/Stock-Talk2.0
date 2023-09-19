const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    user: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    post: async (_, { _id }) => {
      try {
        const post = await Post.findById(_id).populate('user');
        return post;
      } catch (error) {
        throw new Error('Error fetching post by ID');
      }
    },
    posts: async () => {
      try {
        const posts = await Post.find().populate('user');
        return posts;
      } catch (error) {
        throw new Error('Error fetching posts');
      }
    },
    postsByCategory: async (_, { category }) => {
      try {
        const posts = await Post.find({ category }).populate('user');
        return posts;
      } catch (error) {
        throw new Error('Error fetching posts by category');
      }
    },
    commoditiesData: async () => {
      try {
        // Implement the resolver logic to fetch commodities data here
        // For example, you can use a library like axios to make an API request.
        const response = await axios.get('https://api.example.com/commodities');
        return response.data; // Assuming the data is returned as JSON
      } catch (error) {
        throw new Error('Error fetching commodities data');
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        await user.save();

        return user;
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
          expiresIn: '1h',
        });

        return token;
      } catch (error) {
        throw new Error('Error logging in');
      }
    },
    createPost: async (_, { text, category }, { user }) => {
      try {
        if (!user) {
          throw new Error('Unauthorized');
        }

        const post = new Post({
          text,
          category,
          user: user._id,
        });

        await post.save();

        return post;
      } catch (error) {
        throw new Error('Error creating post');
      }
    },
    likePost: async (_, { _id }, { user }) => {
      try {
        if (!user) {
          throw new Error('Unauthorized');
        }

        const post = await Post.findById(_id);
        if (!post) {
          throw new Error('Post not found');
        }

        post.likes += 1;
        await post.save();

        return post;
      } catch (error) {
        throw new Error('Error liking post');
      }
    },
  },
};

module.exports = resolvers;
