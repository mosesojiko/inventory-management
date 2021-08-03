const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    url:{
        type: String,
        required: true
    },
    user: { type: mongoose.Types.ObjectId },
    date: {
        type: Date,
        default: Date.now
    },
    
    
    
})

module.exports = mongoose.model('Products', productSchema,)