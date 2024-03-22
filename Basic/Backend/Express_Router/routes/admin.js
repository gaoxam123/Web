const express = require('express')
const router = express.Router()

router.get('/topsecrete', (req, res) => {
    res.send('top secrete')
})

router.get('/deleteeverything', (req, res) => {
    res.send('deleted')
})

module.exports = router