import express from "express";
import mongoose from "mongoose";
import Cors from "cors"
import Cards from './dbCards.js'

// App Config
const app = express();
const port = process.env.PORT || 8001
const uri = 'mongodb+srv://fordstphn:JOvRV8fE35skPjEp@cluster0.ronso6r.mongodb.net/?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors());


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

app.post('/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) =>{
        if (err) {
            res.status(500).send(err)

        } else{
            res.status(201).send(data)
        }
    })

});

app.get('/cards', async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Listener
app.listen(port,  () => console.log(`listening on localhost: ${port}`));

