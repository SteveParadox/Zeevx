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

  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user._id;
  
      // Create a reference to the Firebase Storage bucket
      const storageRef = storage.bucket();
  
      // Upload the file to Firebase Storage
      const fileUpload = storageRef.file(`images/${req.file.originalname}`);
      const stream = fileUpload.createWriteStream();
      stream.end(req.file.buffer);
  
      // Wait for the upload to complete
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });
  
      // Construct the image URL from the Firebase Storage bucket URL
      const imageUrl = `https://storage.googleapis.com/${storageRef.name}/${fileUpload.name}`;
  
      // Create a new Image document in your MongoDB
      const image = new Image({
        title,
        description,
        imageUrl,
        user: userId,
      });
  
      // Save the image document to the database
      await image.save();
  
      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
