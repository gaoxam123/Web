const express = require('express')
const router = express.Router()


// middleware for all routes on this router
router.use((req, res, next) => {
    if(req.query.isAdmin) {
        next()
    }
    res.send('not admin')
})

router.get('/topsecret', (req, res) => {
    res.send('this is secret')
})

router.get('/delete', (req, res) => {
    res.send('delete')
})

module.exports = router