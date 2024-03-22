const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params
    res.render('subreddit.ejs', {subreddit})
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    // can pass variables to the file
    res.render('random.ejs', {rand: num})
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})