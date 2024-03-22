// id declared in html file
const id = document.getElementById('id')

// ex: img -> collection of imgs in the html
const tag = document.getElementsByTagName('tag')
const all_imgs = document.getElementsByTagName('img')

for(let img in all_imgs) {
    img.src = 'new url'
}

// class declared in html file
const class_name = document.getElementsByClassName('class')

const squareImgs = document.getElementsByClassName('square')

for(let img in squareImgs) {
    img.src = 'new url'
}

// select first match of a paragraph
document.querySelector('p')
// select by class
document.querySelector('.square')
// by id
document.querySelector('#id')
// select by type and attribute
document.querySelector('a[title="Java"]')

// return a collection of all matchings
document.querySelectorAll('p a') // select all anchor tags inside a paragraph, if use + then adjacency

const links = document.querySelectorAll('p a')

for(let link in links) {
    console.log(link.href)
}



// PROPERTIES AND METHODS (the important ones)

const h1 = document.querySelector('h1')

// the content of one paragraph
const p_innerText = document.querySelector('p').innerText

// return every piece of content that appears in the html, innerText can hide some hidden ones (using display: none)
const p_textContent = document.querySelector('p').textContent

// display also the tags of the html elements
const p_innerHTML = document.querySelector('p').innerHTML

// Attributes

const firstLink = document.querySelector('a')
firstLink.href
firstLink.getAttribute('href')
firstLink.setAttribute('href', 'google.com')

// Changing styles

h1.style.color = 'green'
h1.style.fontSize = '3em'

for(let link in links) {
    link.style.color = 'red'
    link.style.textDecorationColor = 'magenta'
}

const h2 = document.querySelector('h2')
h2.getAttribute('class')
h2.setAttribute('class', 'purple')
h2.setAttribute('class', 'border')
let currentClasses = h2.getAttribute('class')
h2.setAttribute('class', `${currentClasses} purple`)

h2.classList.add('purple')
h2.classList.add('border')
h2.classList.remove('border')
h2.classList.contains('border')
h2.classList.toggle('purple')

// Parent/Child/Sibling

const firstBold = document.querySelector('b')
const paragraph = firstBold.parentElement
paragraph.children // return a html collection

const firstSquare = document.querySelector('.square')
firstSquare.nextSibling // return the next node(could be blank or white space)
firstSquare.nextElementSibling // return the next element, same for previous

const newImg = document.createElement('img')
newImg.src = 'new url'
document.body.appendChild(newImg) // add as the last child of the body
newImg.classList.add('.square')

const newh3 = document.createElement('h3')
newh3.innerText = 'im new'
document.body.appendChild(newh3)

p = document.querySelector('p')
p.append('im new text', 'also new text')
const newB = document.createElement('b')
newB.append('Hi!')
p.prepend(newB)

h2.append('are adorable babies')
const h1 = document.createElement('h1')
h1.insertAdjacentElement('afterend', h2) // more about this on the website, 4 total
h1.after(newh3)

// remove child

const firstLI = document.querySelector('li')
firstLI.parentElement.removeChild(firstLI)
firstLI.remove()