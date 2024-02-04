import express from "express";
import multer from 'multer';
import mongoose from 'mongoose';

const router = express.Router();

import Image from '../DB/Upload.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/user/:userId/images', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const images = await Image.find({ user: userId });
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

      //const userObjectId = mongoose.Types.ObjectId(userId);
  
      const image = new Image({
        name: name,
        imgUrl: imgUrl, 
        user: userId,
      });
  
      await image.save();
  
      res.json({ message: 'Image details saved to the database successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
