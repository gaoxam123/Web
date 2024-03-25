const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const {campgroundSchema, reviewSchema} = require('./schemas.js')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const Review = require('./models/review.js')
const morgan = require('morgan')
const review = require('./models/review.js')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(morgan('dev'))
app.use(express.urlencoded({extended: true  }))
app.use(methodOverride('_method'))

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { 
        // remember to add this
        next()
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { 
        // remember to add this
        next()
    }
}

// HOME PAGE
app.get('/', (req, res) => {
    res.render('home')
})


// SHOW EVERYTHING
app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})


// PROCEED TO NEW
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// CREATE NEW ONE
app.post('/campgrounds', validateCampground, catchAsync(async(req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Data', 400)
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    res.redirect(`/campgrounds/${newCampground._id}`)
    // res.send(req.body)
    // console.log(req.body)
    // res.send('created')
}))

// SHOW ONE
app.get('/campgrounds/:id', catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id).populate('reviews')
    res.render('campgrounds/show', {campground})
}))

// PROCEED TO EDIT
app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render(`campgrounds/edit`, {campground})
}))

// EDIT
app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async(req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

// REVIEW ROUTES

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${req.params.id}`)
}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // remove from array
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${id}`)
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if(!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})