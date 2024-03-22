const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })

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

// const makeTweets = async () => {
//     //const user = new User({name: 'chickenfan99', age: 61})
//     const user = await User.findOne({username: 'chickenfan99'})
//     const tweet2 = new Tweet({text:'MILF', likes: 1234})
//     tweet2.user = user
//     await tweet2.save()
// }

// makeTweets()

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t)
}

findTweet()