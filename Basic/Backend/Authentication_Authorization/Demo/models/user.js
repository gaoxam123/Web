const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username Cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function(username, pw) {
    const foundUser = await this.findOne({username})
    const isValid = await bcrypt.compare(pw, foundUser.password)
    return isValid ? foundUser : false
}

userSchema.pre('save', async(next) => {
    if(!this.isModified('password')) return next() // not sure
    this.password = await bcrypt.hash(this.password, 12) // this refers to the created user
    next()
})

module.exports = mongoose.model('User', userSchema)