const Campground = require('../models/campground.js')
module.exports.index = async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}
module.exports.createCampground = async(req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Data', 400)
    const newCampground = new Campground(req.body.campground)
    newCampground.author = req.user._id // req.user is added by passport
    await newCampground.save()
    req.flash('success', 'Successfully created a new campground')
    res.redirect(`/campgrounds/${newCampground._id}`)
    // res.send(req.body)
    // console.log(req.body)
    // res.send('created')
}
module.exports.showCampground = async(req, res) => {
    const {id} = req.params
    // populate author for the reviews too
    const campground = await Campground.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author')
    console.log(campground)
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground, msg: req.flash('success')})
}
module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        res.redirect('/campgrounds')
    }
    res.render(`campgrounds/edit`, {campground})
}
module.exports.updateCampground = async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.deleteCampground = async(req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
}