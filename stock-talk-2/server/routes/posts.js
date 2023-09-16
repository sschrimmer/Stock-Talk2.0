const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get posts by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category }).populate('user');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new post
router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, category } = req.body;
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text,
        category,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Like a post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has already been liked by this user
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
