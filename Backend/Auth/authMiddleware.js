import express from "express";
import admin from "firebase-admin";

const router = express.Router();
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();


router.use(session({
  secret: process.env.SECRET_KEY, 
  resave: false,
  saveUninitialized: true,
}));

import serviceAccount from '../Keys/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.use(async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; 
    req.session.user = {
      uid: decodedToken.uid,
      displayName: decodedToken.displayName,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);

    // development
    if (process.env.NODE_ENV === 'development') {
      return res.status(401).json({ error: 'Unauthorized', details: error.message });
    }

    // In production
    res.status(401).json({ error: 'Unauthorized' });
  }
});


export default router;
