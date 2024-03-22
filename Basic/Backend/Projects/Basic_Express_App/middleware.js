const {campgroundSchema} = require('./schemas.js')
const Campground = require('./models/campground')
const Review = require('./models/review')

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)) {
        res.flash('error', 'no permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const {id, reviewId} = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)) {
        res.flash('error', 'no permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}