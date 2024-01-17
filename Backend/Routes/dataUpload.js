import express from "express";
import multer from 'multer';

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

router.post('/upload', async (req, res) => {
    console.log(req.user);

    try {
      const { name, imgUrl } = req.body;
      const userId = req.user._id;
      console.log(userId);
  
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
