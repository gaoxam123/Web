const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})


// create new virtual properties (found on node, not saved in db)
personSchema.virtual('fullName')
.get(function() {
    return `${this.first} ${this.last}`
})
// use the new properties to update others
.set(function(fullname) {
    this.first = fullname.substr(0, fullname.indexOf(' '))
    this.last = fullname.substr(fullname.indexOf(' ') + 1)
})


// mongoose middleware
// before we save something
personSchema.pre('save', async function() {
    this.first = 'yo'
    this.last = 'mama'
    console.log('about to save')
})

// after we save
personSchema.post('save', async function() {
    console.log('saved')
})

const Person = mongoose.model('Person', personSchema)