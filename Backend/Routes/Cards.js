const express = require('express');
const router = express.Router();
const User = require('../DB/dbCards.js'); 

router.post('/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) =>{
        if (err) {
            res.status(500).send(err)

        } else{
            res.status(201).send(data)
        }
    })

});

router.get('/cards', async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;
