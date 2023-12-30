import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    name: { type: String, index: true }, 
    imgUrl: String,
});

export default mongoose.model('Cards', cardSchema);
