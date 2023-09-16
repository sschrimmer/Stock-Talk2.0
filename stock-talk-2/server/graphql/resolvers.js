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
        // Fetch commodities data from Alpha Vantage
        commoditiesData: async () => {
          const functionName = 'TIME_SERIES_INTRADAY';
          const symbol = 'COMMODITIES'; // You can specify a particular commodity symbol here
          return fetchAlphaVantageData(functionName, symbol);
        },
    
        // Fetch cryptocurrency data from Alpha Vantage
        cryptocurrencyData: async () => {
          const functionName = 'TIME_SERIES_INTRADAY';
          const symbol = 'CRYPTO'; // You can specify a particular cryptocurrency symbol here
          return fetchAlphaVantageData(functionName, symbol);
        },
    
        // Fetch forex data from Alpha Vantage
        forexData: async () => {
          const functionName = 'TIME_SERIES_INTRADAY';
          const symbol = 'FOREX'; // You can specify a particular forex symbol here
          return fetchAlphaVantageData(functionName, symbol);
        },
    
        // Fetch economic indicators data from Alpha Vantage
        economicIndicatorsData: async () => {
          const indicators = ['GDP', 'INFLATION', 'UNEMPLOYMENT'];
          const data = {};
    
          for (const indicator of indicators) {
            const functionName = 'TIME_SERIES_DAILY';
            const symbol = indicator;
            data[indicator] = await fetchAlphaVantageData(functionName, symbol);
          }
    
          return data;
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

