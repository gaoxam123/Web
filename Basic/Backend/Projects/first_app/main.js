const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('this is the home page')
})

// match anything which has this pattern
app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params)
    const { subreddit } = req.params
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postID', (req, res) => {
    // console.log(req.params)
    const { subreddit, postID } = req.params
    res.send(`<h1>Viewing post id ${postID} on the ${subreddit} subreddit`)
})

app.get('/search', (req, res) => {
    // q is the key, the same in the query
    const { q } = req.query
    if(!q) {
        res.send('nothing found if nothing search')
    }
    res.send(`<h1>Search result for: ${q}</h1>`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})