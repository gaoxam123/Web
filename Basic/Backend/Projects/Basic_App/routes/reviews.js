const express = require('express')
const router = express.Router({mergeParams: true}) // take parameters from the prefix string
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground.js')
const Review = require('../models/review.js')
const {campgroundSchema, reviewSchema} = require('../schemas.js')

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

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Created new Review')
    res.redirect(`/campgrounds/${req.params.id}`)
}))

router.delete('/:reviewId', catchAsync(async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // remove from array
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Deleted Review')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router