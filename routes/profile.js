const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const Posts = require('../models/Post');
router.get('/profile', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ message: "Email query parameter is required" });
  }
  
  try {
    const user_data = await Users.findOne({ email: email });
    if (!user_data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile data loaded successfully", data: user_data });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data" });
  }
});
router.get('/followers',async (req,res)=>{
  const email = req.query.email;
  if(!email){
    return res.status(400).json({message:"Email query paramater is required"});
  }
  try {
    const user = await Users.findOne({ email }).populate('followers'); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    console.log(user.followers);
    res.status(200).json({message:"Followers Data loaded successfully", data: user.followers });
  } catch (error) {
    res.status(500).json({message:"Error fetching the followers for the user!"})
  }
})
router.get('/following',async (req,res)=>{
  const email = req.query.email;
  if(!email){
    return res.status(400).json({message:"Email query paramater is required"});
  }
  try {
    const user = await Users.findOne({ email }).populate('following'); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    console.log(user.followers);
    return res.status(200).json({message:"Following Data loaded successfully", data: user.following });
  } catch (error) {
    res.status(500).json({message:"Error fetching the followers for the user!"})
  }
})
router.post('/addPost', async (req, res) => {
  const { email, image, caption } = req.body;
  console.log('Received data:', { email, image, caption });

  try {
    // Attempt to find the user
    const user = await Users.findOne({ email });
    console.log('User found:', user);
    if (!user) {
      return res.status(400).json({ message: 'User could not be found' });
    }

    // Attempt to create a new post
    const newPost = new Posts({
      user: user._id,
      image: image,
      caption: caption,
      likes: [],
      comments: []
    });

    const savedPost = await newPost.save();
    console.log('Saved post:', savedPost);

    // Attempt to update user's posts list
    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json({ message: 'Post created successfully', data: savedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});
router.get('/userPosts',async(req,res)=>{
  const email = req.query.email;
  if(!email){
    return res.status(400).json({message:"Email query paramater is required"});
  }
  try {
    const user = await Users.findOne({ email }).populate('posts'); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    console.log(user.posts);
    return res.status(200).json({message:"Posts Data loaded successfully", data: user.posts });
  } catch (error) {
    res.status(500).json({message:"Error fetching the posts for the user!"})
  }
});
router.post('/test', (req, res) => {
  console.log('Test route reached');
  res.status(200).send('Test route working');
});


module.exports = router;
