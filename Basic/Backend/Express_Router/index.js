const express = require('express')
const app = express()
const shelterRoutes = require('./route/shelter')
const dogRoutes = require('./route/dog')
const adminRoutes = require('./route/admin')

// app.use((req, res, next) => {
//     if(req.query.isAdmin) {
//         next()
//     }
//     res.send('not admin')
// })
app.use('/shelters', shelterRoutes)
app.use('/dogs', dogRoutes)
app.use('/admin', adminRoutes)

app.listen(2500, () => {
    console.log('listening on port 3000')
})