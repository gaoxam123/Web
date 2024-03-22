const express = require('express')
const app = express()
const session = require('express-session')

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions))

app.get('/viewcount', (req, res) => {
    if(req.session.count) {
        req.session.count ++
    }
    else {
        req.session.count = 1
    }
    res.send(`you have viewed ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const {username = "anonymous"} = req.query
    req.session.username = username
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const {username} = req.session
    res.send(username)
})

app.listen(3000, () => {
    console.log('serving')
})