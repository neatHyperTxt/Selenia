const express = require('express');
const router = express.Router();
const Users = require('../models/User');

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

module.exports = router;
