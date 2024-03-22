const express = require("express")
const app = express()

// app.use((req, res) => { // objects made by express
//     console.log("FUCK")
//     //res.send("FUCKING RESPONDED")
//     res.send({color: 'red'})
// })

app.get('/r/:subreddit', (req, res) => { // subreddit is a parameter which represent everything
    const { subreddit } = req.params
    res.send(`browsing the ${subreddit}`)
})

app.get('/r/:subreddit/:postID', (req, res) => {
    const { subreddit, postID } = req.params
    res.send(`<h1> browsing the ${subreddit} with id ${postID} <h1>`)
})

app.get('/cats', (req, res) => {
    res.send('meow')
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})

app.get('/', (req, res) => {
    res.send('FUCKKKKKK')
})

app.post('/cats', (req, res) => {
    res.send('not get request')
})

app.get('/search', (req, res) => {
    const {q, color} = req.query
    if(!q && !color) res.send('nothing here')
    res.send(`fuck ${q} and ${color}`)
})

app.get('*', (req, res) => { // everything else (order matters, do not put this in first place)
    res.send('fuck again bitch')
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})