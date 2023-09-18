const db = require('../config/connection');
const { Post, User } = require('../models');

const postData = require('./postData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Post.deleteMany({});

  const posts = await Post.insertMany(postData);
  console.log('Posts seeded!');

  const users = await Post.insertMany(userData);
  console.log('Users seeded!');
  process.exit(0);
});
