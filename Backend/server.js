import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import corsOptions from './corsConfig.js';

import googleLoginRouter from './Routes/Login.js';
import CardRouter from './Routes/Cards.js';
import UploadRouter from './Routes/dataUpload.js';



// App Config
const app = express();
const port = process.env.PORT || 8001
const uri = 'mongodb+srv://fordstphn:JOvRV8fE35skPjEp@cluster0.ronso6r.mongodb.net/?retryWrites=true&w=majority';


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));


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

app.use('/', googleLoginRouter);
app.use('/', CardRouter);
app.use('/', UploadRouter);


// Listener
app.listen(port,  () => console.log(`listening on localhost: ${port}`));

