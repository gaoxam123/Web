const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Joi = require('joi')
const {campgroundSchema, reviewSchema} = require('./schemas.js')
const Review = require('./models/review.js')

const Campground = require('./models/campground')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const userRoutes = require('./routes/users')
const {isLoggedIn, isAuthor, isReviewAuthor} = require('./middleware')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('database connected')
})

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else next()
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else next()
}

app.get('/fakeUser', async(req, res) => {
    const user = new User({email: 'fuck@gmail.com', username: 'fuck you'})
    const newUser = await User.register(user, 'chicken')
    res.send(newUser)
})

app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send('hello')
})


// main page
app.get('/campgrounds', catchAsync(async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))


// add new objects
app.get('/campgrounds/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})
// process add request
app.post('/campgrounds', isLoggedIn, validateCampground, catchAsync(async(req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('invalid campground data', 400)

    const newCampground = new Campground(req.body.campground)
    newCampground.author = req.user._id
    await newCampground.save()
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${newCampground._id}`)
}))


// find object by id
app.get('/campgrounds/:id', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate({path:'reviews', populate: {path: 'author'}}).populate('author')
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground})
}))


// edit objects
app.get('/campgrounds/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground})
}))
// process edit request
app.put('/campgrounds/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)) {
        res.flash('error', 'no permission to do that')
        res.redirect(`/campgrounds/${id}`)
    }
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))


// delete objects
app.delete('/campgrounds/:id', isLoggedIn, isReviewAuthor, catchAsync(async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}))




app.post('/campgrounds/:id/reviews', isLoggedIn, validateReview, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'created a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id/reviews/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}))


// handling unknown request
app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    const {status = 500, msg = 'smth went wrong'} = err
    if(!err) err.msg = 'smth went wrong'
    res.status(status).render('error', {err})
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})


// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
// const ExpressError = require('./utils/ExpressError');
// const methodOverride = require('method-override');


// const campgrounds = require('./routes/campgrounds');
// const reviews = require('./routes/reviews');

// mongoose.connect('mongodb://localhost:27017/yelp-camp');

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const app = express();

// app.engine('ejs', ejsMate)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'))

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')))

// const sessionConfig = {
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }
// app.use(session(sessionConfig))
// app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

// app.use('/campgrounds', campgrounds)
// app.use('/campgrounds/:id/reviews', reviews)

// app.get('/', (req, res) => {
//     res.render('home')
// });


// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!'
//     res.status(statusCode).render('error', { err })
// })

// app.listen(3000, () => {
//     console.log('Serving on port 3000')
// })