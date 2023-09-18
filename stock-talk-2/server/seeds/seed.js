const db = require('../config');
const Post = require('../models/Post');
const User = require('../models/User');

const postData = require('./postData.json');
const userData = require('./userData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    const posts = await Post.insertMany(postData);
    const users = await User.insertMany(userData);
    
    for (const newUser of users){ await newUser.save(); }

    for (const newPost of posts){
        const tempUser = users[Math.floor(Math.random() * users.length)];
        console.log(tempUser)
        newPost.user = tempUser._id;
        await newPost.save();
    }

    

    console.log('Seeded!');
    process.exit(0);
});
