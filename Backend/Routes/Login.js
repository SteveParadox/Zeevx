import express from "express";
const router = express.Router();
import User from '../DB/User.js';


router.post('/google-login', async (req, res) => {
  try {
    const { displayName, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists. Login successful.' });
    }

    const newUser = new User({
      displayName,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({ message: 'User data saved successfully.' });
  } catch (error) {
    console.error('Error during Google login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
