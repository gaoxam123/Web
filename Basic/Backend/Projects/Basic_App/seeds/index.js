const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i ++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251/1200x600',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sed, earum saepe voluptatibus neque rerum tempore dolorem ex rem cupiditate beatae mollitia dolores. Ipsa, ratione. Ut dolor qui labore provident.',
            price: price
        })
        await camp.save()
    }
}

seedDB()
.then(() => {
    mongoose.connection.close()
})