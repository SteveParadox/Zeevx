import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import corsOptions from './corsConfig.js';

import googleLoginRouter from './Routes/Login.js';
import CardRouter from './Routes/Cards.js';
import UploadRouter from './Routes/dataUpload.js';
import User from './DB/User.js';

// import passport from 'passport';
// import cookieSession from "cookie-session";

// import passportSetup from './Auth/passport.js'

import dotenv from 'dotenv';
dotenv.config();


// App Config
const app = express();
const port = process.env.PORT || 8001
const uri = process.env.DB_URI;


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

/* app.use(
  cookieSession({
    name: "session",
    keys: ["zeevx"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
*/


// app.use('/api', authMiddleware);

app.get('/api/protected-resource', (req, res) => {
    try {
        const { uid, email, displayName } = req.user;
        // await saveUserDataToDatabase({ uid, email, displayName });
        res.json({ message: 'Successfully accessed protected resource', user: req.user, additionalInfo });
    } catch (error) {
        console.error('Error performing backend operations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
}});

async function saveUserDataToDatabase(userData) {
    try {
      const newUser = new User({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
      });
  
      await newUser.save();
  
      console.log('User data saved to the database:', userData);
      return { success: true, message: 'User data saved successfully.' };
    } catch (error) {
      console.error('Error saving user data to the database:', error);
  
      if (error.code === 11000) {
        return { success: false, message: 'User already exists.' };
      }
  
      return { success: false, message: 'Internal Server Error' };
    }
  }
  
//Db Config
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//Api Endpoint
app.get('/', (req, res) => res.status(200).
send(
"   Hello World"
));

app.use('/auth', googleLoginRouter);
app.use('/', CardRouter);
app.use('/', UploadRouter);


// Listener
app.listen(port,  () => console.log(`listening on localhost: ${port}`));

