const express = require('express')
const app = express()
const User = require('./models/user')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'notagoodone',
    resave: false,
    saveUninitialized: true
}))

const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login')
    }
    next()
}

app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    const {password, username} = req.body
    const user = new User({username, password})
    await user.save()
    req.session.user_id = user._id
    res.redirect('/secret')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body
    const foundUser = await User.findAndValidate(username, password)
    if(foundUser) {
        req.session.user_id = foundUser._id
        res.redirect('/secret')
    }
    else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null
    // req.session.destroy() => destroy the session
    res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})

app.listen(2500, () => {
    console.log('3000')
})