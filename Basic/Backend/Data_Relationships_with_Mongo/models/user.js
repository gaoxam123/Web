const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })


// ONLY USE IF THERE IS ONLY LITTLE DATA
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async() => {
    const user = new User({
        first: 'Harry',
        last: 'Potter',
    })
    user.addresses.push({
        street: '123',
        city: 'NY',
        state: 'NY',
        country: 'US'
    })
    const res = await user.save()
    console.log(res)
}

const addAddress = async(id) => {
    const user = await User.findById(id)
    user.addresses.push({})
    await user.save()
}