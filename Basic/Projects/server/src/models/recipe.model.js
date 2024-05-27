const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price must be at least 0'],
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe