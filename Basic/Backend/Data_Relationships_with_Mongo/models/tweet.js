const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })

//  LARGE SIZE => REFER IN THE OTHER WAY AROUND

    const userSchema = new Schema({
        username: String,
        age: Number,
    })

    const tweetSchema = new Schema({
        text: String,
        likes: Number,
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    })

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)    

const makeTweets = async() => {
    const user = new User({username: 'abc', age: 18})
    const tweet1 = new Tweet({text: 'def', likes: 0})
    const tweet2 = new Tweet({text: 'asdfasdfasdf', likes: 1239471230984712394})
    tweet1.user = user
    tweet2.user = user
    await user.save()
    await tweet1.save()
    await tweet2.save()
}

const findTweet = async() => {
    const t = await Tweet.findOne({}).populate('user') // ID of the user -> every info of the user
    const u = await Tweet.findOne({}).populate('user', 'username') // ID -> Id and username
}   