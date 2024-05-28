const launches = new Map()

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1', 
    launchDate: new Date('April 06, 2015'),
    destination: 'Kepler-442 b',
    customer: ['NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

module.exports = {launches}