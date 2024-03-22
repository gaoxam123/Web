fetch("https://swapi.dev/api/people/1")
.then(res => {
    console.log('resolved', res)
    // res.json().then((data) => console.log('json done', data))
    return res.json()
})
.then(data => {
    console.log(data)
    return fetch("https://swapi.dev/api/people/2")
})
.then(res => {
    console.log('resolved', res)
    return res.json()
})
.then(data => {
    console.log(data)
    return fetch("https://swapi.dev/api/people/3")
})
.catch(err => {
    console.log('rejected', err)
})

const loadStarwarspeople = async () => {
    try {
        const res = await fetch("https://swapi.dev/api/people/1")
        const data = await res.json()
        console.log(data)
        const res2 = await fetch("https://swapi.dev/api/people/1")
        const data2 = await res2.json()
        console.log(data2)
    }
    catch(e) {
        console.log(e)
    }
} 

loadStarwarspeople()

const getStarwarspeople = async (id) => { 
    try {
        const res = await axios.get(`https://swapi.dev/api/people/${id}/`)
        console.log(res.data)
    }
    catch(e) {
        console.log(e)
    }
}

const form = document.querySelector('#searchForm')
form.addEventListener('submit', async function(e) {
    e.preventDefault()
    const searchTerm = form.elements.query.value
    const config = {params: {q: searchTerm, isdog: 'yes'}, headers: {}}
    const res = await axios.get(`https://swapi.dev/api/people/`, config)
    makeImages(res.data)
    form.elements.query.value = ''
})

const makeImages = (shows) => {
    for(let res of shows) {
        if(res.show.image) {
            const img = document.createElement("IMG")
            img.src = res.show.image.medium
            document.body.append(img)
        }
    }
}