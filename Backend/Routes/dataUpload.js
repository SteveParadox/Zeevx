import express from "express";
import multer from 'multer';
import mongoose from 'mongoose';

const router = express.Router();

import User from '../DB/User.js';
import Image from '../DB/Upload.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/user/:userId/images', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ uid: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const images = await Image.find({ user: user.id });
      if (!images) {
        return res.status(404).json({ error: 'No image found' });
      }
      res.json(images);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/user/:userId/upload', async (req, res) => {
    try {
      const { name, imgUrl } = req.body;
      const userId = req.params.userId;

      const user = await User.findOne({ uid: userId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }


      const image = new Image({
        name: name,
        imgUrl: imgUrl, 
        user: user,
      });

      await image.save();

      res.json({ message: 'Image details saved to the database successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
