const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('thisissecret'))

app.get('/greet', (req, res) => {
    // cookies -> js object
    console.log(req.cookies)
    res.send('hi there')
})


// SENDING A COOKIE
app.get('/setname', (req, res) => {
    res.cookie('name', 'dog')
    res.cookie('animal', 'cat')
    res.send('sent you a cookie')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true})
    res.send('signed your cookie')
})

app.get('/verifyfruit', (req, res) => {
    res.send(req.cookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log('3000')
})