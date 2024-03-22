const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {
//     console.log('connection opened')
// })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)
// const amadeus = new Movie({title: "amadeus", year: 1986, score: 9.2, rating:'R'})

// Movie.insertMany([
//     {title: "amelie", year: 1986, score: 9.2, rating:'R'},
//     {title: "alien", year: 1986, score: 9.2, rating:'R'},
//     {title: "stand by me", year: 1986, score: 9.2, rating:'R'},
//     {title: "moonr", year: 1986, score: 9.2, rating:'R'}
// ])
//     .then(data => {
//         console.log('it worked')
//         console.log(data)
//     })