import express from "express";
import multer from 'multer';

const router = express.Router();

import Image from '../DB/Upload.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const userId = req.user._id;
  
      const image = new Image({
        title,
        description,
        imageUrl: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        user: userId,
      });
  
      await image.save();
      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
