const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground.js')
const {campgroundSchema, reviewSchema} = require('../schemas.js')

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

// SHOW EVERYTHING
router.get('/', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})


// PROCEED TO NEW
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

// CREATE NEW ONE
router.post('/', validateCampground, catchAsync(async(req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Data', 400)
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    res.redirect(`/campgrounds/${newCampground._id}`)
    // res.send(req.body)
    // console.log(req.body)
    // res.send('created')
}))

// SHOW ONE
router.get('/:id', catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id).populate('reviews')
    res.render('campgrounds/show', {campground})
}))

// PROCEED TO EDIT
router.get('/:id/edit', catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render(`campgrounds/edit`, {campground})
}))

// EDIT
router.put('/:id', validateCampground, catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', catchAsync(async(req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

module.exports = router