const mongoose = require('mongoose')
const Review = require('./review.js')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200')
})

const campgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

campgroundSchema.post('findOneAndDelete', async function(camp) {
    if(camp) {
        await Review.deleteMany({_id: {$in: camp.reviews}})
    }
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground