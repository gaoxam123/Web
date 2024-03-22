const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid')
uuid()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'todd',
        comment: 'fuck you'
    },
    {
        id: uuid(),
        username: 'peter',
        comment: 'fuck you too'
    },
    {
        id: uuid(),
        username: 'brian',
        comment: '6 ducks'
    },
    {
        id: uuid(),
        username: 'hung',
        comment: 'loliloliloli'
    }
]

app.get('/comments', (req, res) => { //show all
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => { //create form
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body //create new one
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => { //show 1
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.patch('/comments/:id', (req, res) => { //update
    const { id } = req.params
    const newcomment = req.body.comment
    const comment = comments.find(c => c.id === id)
    comment.comment = newcomment
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req, res) => { //form to update
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.delete('/comments/:id', (req, res) => { //delete            
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send('Get /tacos response')
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body
    res.send(`${qty} ${meat}`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})