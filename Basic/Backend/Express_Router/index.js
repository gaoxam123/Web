const express = require('express')
const app = express()
const shelterRoutes = require('./routes/shelters')
const dogRoutes = require('./routes/dogs')
const adminRoutes = require('./routes/admin')

app.use((req, res, next) => {
    if(req.query.isAdmin) {
        next()
    }
    res.send('sorry not an admin')
})

app.use('/shelters', shelterRoutes)
app.use('/dogs', dogRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, () => {
    console.log('on port 3000')
})