const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    cookingInstruction: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard', 'advanced']
    },
    category: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert']
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
    },
    price: {
        type: Number,
        min: [0, 'Price must be at least 0'],
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe