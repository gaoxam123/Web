const express = require('express')
const app = express()

// req, res are objs made by express, passed into the callback
// app.use((req, res) => {
//     console.log('hello')
//     res.send('hello, we got your request')
// })

app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.post('/cats', (req, res) => {
    res.send('post request to /cats')
})

app.get('/cats', (req, res) => {
    res.send('meow')
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})


// PATHS ARE MATCHED IN ORDER -> * MUST BE AT THE BOTTOM
app.get('*', (req, res) => {
    res.send('no path')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})