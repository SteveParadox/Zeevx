import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import corsOptions from './corsConfig.js';

import googleLoginRouter from './Routes/Login.js';
import CardRouter from './Routes/Cards.js';
import UploadRouter from './Routes/dataUpload.js';
import User from './DB/User.js';


import dotenv from 'dotenv';
dotenv.config();


// App Config
const app = express();
const port = process.env.PORT || 8001
const uri = process.env.DB_URI;


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));



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

