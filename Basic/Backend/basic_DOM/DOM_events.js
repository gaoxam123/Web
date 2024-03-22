const btn = document.querySelector('button')
btn.onclick = function() {
    console.log('you clicked me!')
}

function scream() {
    console.log('aaaaaaahhh')
}

btn.onmouseenter = scream

document.querySelector('h1').onclick = function () {
    alert('you clicked the h1')
}

const btn3 = document.querySelector('#3rdbtn')
btn3.addEventListener('click', function() {
    alert('clicked')
})
btn3.addEventListener('dblclick', scream)

function twist() {
    console.log('twist')
}

function shout() {
    console.log('shout')
}

btn3.onclick = twist
btn3.onclick = shout // => only shout works

btn3.addEventListener('click', twist, {once: true}) // only applied once
btn3.addEventListener('click', shout) // this allows us to use both of them at the same time

// Changing color exercise

const button = document.createElement('button')
button.addEventListener('click', function() {
    newColor = randomColor()
    document.body.style.backgroundColor = newColor
    h1.innerText = newColor
})

const randomColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    newColor = `rbg(${r}, ${g}, ${b})`
    
    return newColor
}

// KEYWORD THIS

const buttons = document.querySelectorAll('button')
for(let button in buttons) {
    button.addEventListener('click', function() {
        button.style.backgroundColor = randomColor()
        button.style.color = randomColor()
    }) 
}

const h1s = document.querySelectorAll('h1')
for(let h1 of h1s) {
    // h1.addEventListener('click', function() {
    //     h1.style.backgroundColor = randomColor()
    //     h1.style.color = randomColor()
    // })
    h1.addEventListener('click', colorize())
}

function colorize() {
    this.style.backgroundColor = randomColor()
    this.style.color = randomColor()
}

// EVENT OBJECTS

document.querySelector('button').addEventListener('click', function(evt) {
    console.log(evt)
})

const input = document.querySelector('input')
input.addEventListener('keydown', function(e) {
    console.log('KEYDOWN')
    console.log(e.key)
    console.log(e.code) // position of the key, independent from languages
})

window.addEventListener('keydown', function(e) {
    switch(e.code) {
        case 'ArrowUp':
            console.log('UP!')
            break
        case 'ArrowDown':
            console.log('DOWN')
            break
        default:
            console.log("IGNORED")
    }
})

// Form events and prevent default

const form = document.querySelector('form')
const container = document.querySelector('#tweets')
form.addEventListener('submit', function(e) {
    // const usernameInput = document.querySelectorAll('input')[0]
    // const tweetInput = document.querySelectorAll('input')[1]
    e.preventDefault()
    const username = form.elements.username
    const tweet = form.elements.tweet
    addTweet(username.value, tweet.value)
    username.value = ''
    tweet.value = ''
    // console.log(usernameInput.value, tweetInput.value)
    // console.log('submit')
})

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li')
    const bTag = document.createElement('b')

    bTag.append(username)
    newTweet.append(bTag)
    newTweet.append(`-${tweet}`)
    // console.log(newTweet)
    container.append(newTweet)
}

// input and change event


const h1 = document.querySelector('h1')
input.addEventListener('change', function(e) {

})

input.addEventListener('input', function(e) {
    h1.innerText = input.value
})

// event bubbling and delegation

button.addEventListener('click', function(e) {
    container.style.backgroundColor = randomColor()
    e.stopPropagation() // if the button is inside something else which have another event, that event won't run
})

// const lis = document.querySelectorAll('li')
// for(let li of lis) {
//     li.addEventListener('click', function() {
//         li.remove()
//     })
// }

container.addEventListener('click', function(e) { 
    e.target.nodeName === 'LI' && e.target.remove()
})