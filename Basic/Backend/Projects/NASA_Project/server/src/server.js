const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const {loadPlanetsData} = require('./models/planets.model')
const PORT = process.env.PORT || 8000

async function startServer() {
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log("Listening on port 8000")
    })
}

startServer()