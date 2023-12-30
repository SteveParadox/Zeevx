import express from "express";
const router = express.Router();
const User = require('../DB/User.js'); 

router.post('/google-login', async (req, res) => {
  try {
    const { displayName, email } = req.body;

    // Save user data to MongoDB
    const newUser = new User({
      displayName,
      email,
      // Add more fields as needed
    });

    await newUser.save();

    res.status(200).json({ message: 'User data saved successfully.' });
  } catch (error) {
    console.error('Error saving user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
