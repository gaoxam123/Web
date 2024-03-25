const express = require('express')
const app = express()
const morgan = require('morgan')

// every request (for every verb) comes in, this will be executed, or we can pass in the path
app.use(morgan('dev'))
app.use((req, res, next) => {
    req.method = 'GET' // get even if we send a post req
    req.requestTime = Date.now()
    console.log(req.method.toUpperCase(), req.path)
    next()
})
app.use('/dogs', (req, res, next) => {
    console.log('I love dogs')
    next()
})
const verifyPassword = (req, res, next) => {
    const {password} = req.query
    if(password === 'chickennugget') {
        next()
    }
    res.send('you need to provide the correct password')
}
// app.use((req, res, next) => {
//     // this stops everything
//     // res.send('HIJEACKED')
//     console.log('first middleware')
//     next() // move on to the next (not the end of the line), next matching middleware or route handler
// })
// // we can modify req obj before going into the route handlers e.g: add attributes to req
// app.use((req, res, next) => {
//     // this stops everything
//     // res.send('HIJEACKED')
//     console.log('2nd middleware')
//     return next() 
// })

app.get('/', (req, res) => {
    console.log(`request time: ${req.requestTime}`)
    res.send('home page')
})

app.get('/dogs', verifyPassword, (req, res) => {
    res.send('woof woof')
})


// the function runs first
app.get('/secret', verifyPassword, (req, res) => {
    res.send('NO SECRET HERE DUMB')
})


// this runs if there's no route, should be at the end
app.use((req, res) => {
    res.status(404).send('NOT FOUND')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})