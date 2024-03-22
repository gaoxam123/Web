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

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function() {
    this.first = 'yo'
    this.last = 'mama'
    console.log('about to save')
})

personSchema.post('save', async function() {
    console.log('saved')
})

const Person = mongoose.model('Person', personSchema)