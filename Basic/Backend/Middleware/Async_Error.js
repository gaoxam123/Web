const express = require('express')
const app = express()
const AppError = require('./appError')

app.get('/products/:id', async(req, res, next) => {
    const product = await Product.findbyId(req.params.id)
    // if(!product) throw new AppError('product not found', 404) -> not good
    if(!product) return next(new AppError('product not found', 404)) // return so that res.render does not run

    res.render('/products/show', {product})
})

// same with edit 

app.post('/products', async(req, res, next) => {
    try {
        const newProduct = new Product(req.body)
        await Product.save()
        res.redirect('/products/id')
    }
    catch(e) {
        next(e)
    }
})

function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((e) => next(e))
    }
}

app.post('/products', wrapAsync(async(req, res, next) => {
    const newProduct = new Product(req.body)
    await Product.save()
    res.redirect('/products/id')
}))

app.use((err, req, res, next) => {
    console.log(err.name)
    next(err)
})

const handleValidationErr = err => {
    console.log(err)
    return new AppError(`Validation Failed...${err.msg}`, 400)
}

app.use((err, req, res, next) => {
    const {status = 500, msg = 'smth went wrong'} = err
    if(err.name = 'ValidationError') err = handleValidationErr(err)
    res.status(status).send(msg)
})

app.listen(3000, () => {
    console.log('not listening')
})