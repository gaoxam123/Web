const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const path = require('path')
const recipeRouter = require('./routes/recipe.route')

mongoose.connect('mongodb://127.0.0.1:27017/recipe')
    .then(() => {
        console.log("Mongo connection open!!!")
    })
    .catch(err => {
        console.log("mongo connection error!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use('/', recipeRouter)

app.get('/', (req, res) => {
    res.send("HI")
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if(!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})