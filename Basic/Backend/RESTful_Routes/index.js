const express = require('express')
const app = express()
const path = require('path')
const {v4: uuid} = require('uuid')
const methodOverride = require('method-override')
uuid()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {   
        id: uuid(),
        username: 'todd',
        comment: 'so funny'
    },
    {
        id: uuid(),
        username: 'skyler',
        comment: 'birdwatching'
    },
    {
        id: uuid(),
        username: 'boi',
        comment: 'delete your account'
    },
    {
        id: uuid(),
        username: 'dogs',
        comment: 'woof woof'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body
    comments.push({username: username, comment: comment, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params
    const newComment = req.body.comment
    const comment = comments.find(c => c.id === id)
    comment.comment = newComment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send("Get /tacos response")
})

app.post('/tacos', (req, res) => {
    const {meat, quantity} = req.body
    res.send(`OK, here are your ${quantity} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log('on port 3000')
})