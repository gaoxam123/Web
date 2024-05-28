const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {planetsRouter} = require('./routes/planets/planets.router')
const {launchesRouter} = require('./routes/launces/launches.route')

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use(planetsRouter)
app.use(launchesRouter

)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app