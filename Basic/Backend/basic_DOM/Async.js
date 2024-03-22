console.log('fuck')
setTimeout(() => {
    console.log('fuck')
}, 3000)
console.log('fuck1')

setTimeout(() => {
    document.body.style.backgroundColor = 'red'
    setTimeout(() => {
        document.body.style.backgroundColor = 'orange'
        setTimeout(() => {
            document.body.style.backgroundColor = 'yellow'
            setTimeout(() => {
                document.body.style.backgroundColor = 'green'
                setTimeout(() => {
                    document.body.style.backgroundColor = 'blue'
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)

// const delayColorchange = (newcolor, delay, donext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newcolor
//         donext()
//     }, delay)
// }

// delayColorchange('red', 3000, () => {
//     delayColorchange('orange', 3000, () => {
//         delayColorchange('yellow', 3000, () => {
//             delayColorchange('green', 3000, () => {
//                 delayColorchange('blue', 3000, () => {
        
//                 })
//             })
//         })
//     })
// })

const delayColorchange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color
            resolve()
        }, delay)
    })
}

delayColorchange('red', 1000)
    .then(() => {return delayColorchange('orange', 1000)})
    .then(() => {return delayColorchange('yellow', 1000)})
    .then(() => {return delayColorchange('green', 1000)})
    .then(() => {return delayColorchange('blue', 1000)})
    .then(() => {return delayColorchange('indigo', 1000)})
    .then(() => {return delayColorchange('violet', 1000)})

searchMoviesAPI('fuck', () => {
    saveToMyDB(movies, () => {
        // if it works, run this
    }, () => {
        // else run this
    })
}, () => {
    // if API is down
})

const RequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500
    setTimeout(() => {
        if(delay > 4000) {
            failure('connection timeout')
        }
        else {
            success('data ${url}')
        }
    }, delay)
}

const RequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500
        setTimeout(() => {
            if(delay > 4000) {
                reject('connection timeout')
            }
            else {
                resolve(`data ${url}`)
            }
        }, delay)
    })
}

RequestCallback('books.com/page1', function(response) {
    console.log('fuck', response)
    RequestCallback('books.com/page2',
        function(response) {
            console.log('fuck', response)
            RequestCallback('books.com/page3',
            function(response) {
                console.log('fuck', response)
                
            },
            function(err) {
                console.log('unfuck', err)
            })
        },
        function(err) {
            console.log('unfuck', err)
        })
}, function(err) {
    console.log('unfuck', err)
})

const request = RequestPromise('yelp.com/api/coffee')
request.then(() => {
    console.log('fuck')
})
.catch(() => {
    console.log('unfuck')
})

RequestPromise('fuck.com')
    .then(() => {
        console.log('fuck')
        RequestPromise('fuck.com')
            .then(() => {
                console.log('fuck')
                RequestPromise('fuck1.com')
                    .then(() => {
                        console.log('fuck')
                    })
                    .catch(() => {
                        console.log('unfuck')
                    })
            })
            .catch(() => {
                console.log('unfuck')
            })
    })
    .catch(() => {
        console.log('unfuck')
    })

RequestPromise('fuck1.com')
    .then((data) => {
        console.log('fuck', data)
        return RequestPromise('fuck2.com')
    })
    .then((data) => {
        console.log('fuck', data)
        return RequestPromise('fuck3.com')
    })
    .then((data) => {
        console.log('fuck', data)
        return RequestPromise('fuck4.com')
    })
    .catch((data) => {
        console.log('unfuck', data)
    })

// async, await

async function hello() {

}

const sing = async() => { //if an error is thrown or created in the function => promise rejected
    return 'la la la la'
} // promise resolved with the returned value

sing()
    .then((data) => {
        console.log(data) //data is the returned value
    })
    .catch(err => {
        console.log(err)
    })

const login = async(username, password) => {
    if(!username || !password) throw 'missing credentials'
    if(password === 'corgifeetarecute') return 'welcome'
    throw 'invalid'
}

login('asdfasdf')
    .then(msg => {
        console.log('logged in')
    })
    .catch(err => {
        console.log(err)
    })

async function rainbow() {
    await delayColorchange('red', 1000)
    await delayColorchange('orange', 1000)
    await delayColorchange('yellow', 1000)
    await delayColorchange('green', 1000)
    await delayColorchange('blue', 1000)
    await delayColorchange('indigo', 1000)
    await delayColorchange('violet', 1000)
    return 'all done'
}

rainbow()
    .then(() => console.log('end of rainbow'))

async function make2Requests() {
    try {
        let data1 = await RequestPromise('/fuck')
        console.log(data1)
        let data2 = await RequestPromise('/fuck')
        console.log(data2)
    } catch(e) {
        console.log('error caught', err)
    }
}