const express = require('express')
const app = express()
const session = require('express-session')


// THIS IS SEPERATE FOR EACH BROWSER
// by default stored in server memory, not capable for production
const sessionOptions = {secret: 'thisissecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions))

app.get('/viewcount', (req, res) => {
    if(req.session.count) {
        req.session.count += 1
    }
    else {
        req.session.count = 1
    }
    res.send(`you have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const {username = 'ano'} = req.query
    req.session.username = username
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const {username} = req.session
    res.send(`welcome back ${username}`)
})

app.listen(3000, () => {
    console.log('serving')
})