const express = require('express')
const router = express.Router({mergeParams: true}) // take parameters from the prefix string
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware.js')
const reviews = require('../controllers/reviews.js')

router.get('/', isLoggedIn, (req, res) => {
    const {id} = req.params
    res.redirect(`/campgrounds/${id}`)
})

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router