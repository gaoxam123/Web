const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser('thisismysecret'))

app.get('/greet', (req, res) => {
    console.log(req.cookies)
    const {name} = req.cookies
    res.send('hey there')
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'fuck you')
    res.send('ok')
})

app.get('/getsignedcookies', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true})
    res.send('ok signed your fruit cookie')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log("serving")
})