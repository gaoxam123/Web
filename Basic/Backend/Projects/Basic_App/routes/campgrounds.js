const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground.js')
const {campgroundSchema, reviewSchema} = require('../schemas.js')
const {isLoggedIn} = require('../middleware.js')

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
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

// CREATE NEW ONE
router.post('/', isLoggedIn, validateCampground, catchAsync(async(req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Data', 400)
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    req.flash('success', 'Successfully created a new campground')
    res.redirect(`/campgrounds/${newCampground._id}`)
    // res.send(req.body)
    // console.log(req.body)
    // res.send('created')
}))

// SHOW ONE
router.get('/:id', catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id).populate('reviews')
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground, msg: req.flash('success')})
}))

// PROCEED TO EDIT
router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        res.redirect('/campgrounds')
    }
    res.render(`campgrounds/edit`, {campground})
}))

// EDIT
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async(req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
}))

module.exports = router