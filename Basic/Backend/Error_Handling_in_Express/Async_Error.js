const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const Product = require('../MG_Express/models/product')
const AppError = require('./AppError')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, '../MG_Express/views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']


// SHOW EVERYTHING
app.get('/products', async(req, res) => {
    // extract query string
    const {category} = req.query
    if(!category) {
        const products = await Product.find({})
        res.render('products/index', {products, allproduct: true})
    }
    else {
        const products = await Product.find({category: category})
        res.render('products/index', {products, allproduct: false, category})
    }
    // console.log(products)
})


// PROCEED TO NEW
app.get('/products/new', (req, res) => {
    // throw new AppError('not allowed', 401)
    res.render('products/new', {categories})
})

// ADD NEW ONE
app.post('/products', async(req, res, next) => {
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)
    }
    catch(err) {
        next(err)
    }
})

function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err))
    }
}

// SHOW ONE PRODUCT
// req.params used in app.get, taken from the string
// req.body used when some info were sent to the link, e.g submit a form
app.get('/products/:id', wrapAsync(async(req, res, next) => {
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product) {
        return next(new AppError('PRODUCT NOT FOUND', 404))
    }
    // console.log(product)
    res.render('products/show', {product})
}))


// PROCEED TO EDIT
app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
})

// EDIT ONE PRODUCT
app.put('/products/:id', async(req, res, next) => {
    try 
    {    const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
        res.redirect(`/products/${id}`)
    }
    catch(err) {
        next(err)
    }
})

// DELETE BY ID
app.delete('/products/:id', async(req, res) => {
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.use((err, req, res, next) => {
    console.log(err.name)
    next(err)
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'something went wrong'} = err
    res.status(status).send(message)
})

app.listen(2800, () => {
    console.log('listening on port 3000')
})