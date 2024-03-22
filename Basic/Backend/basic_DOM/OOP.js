function hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
console.log(hex(255, 100, 25))

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
}

function makeColor(r, g, b) {
    const color = {}
    color.r = r
    color.g = g
    color.b = b
    color.rgb = () => {
        const {r, g, b} = this
        return `rgb(${r}, ${g}, ${b})`
    }
    color.hex = () => {
        const {r, g, b} = this
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    return color
}

function Color(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
}

let fuck = new Color(255, 40, 100)

Color.prototype.rgb = () => {
    const {r, g, b} = this
    return `rgb(${r}, ${g}, ${b})`
}

Color.prototype.hex = () => {
    const {r, g, b} = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const color1 = new Color(40, 50, 60) 
const color2 = new Color(0, 0, 0)
console.log(color1.hex())
console.log(color1.hex === color2.hex)

class color {
    constructor(r, g, b, name) {
        this.r = r
        this.g = g
        this.b = b
        this.name = name
        this.rgb()
    }
    greet() {
        return `fuck this ${this.name}`
    }
    rgb() {
        const {r, g, b} = this
        return `rgb(${r}, ${g}, ${b}, ${this.greet()})`
    }
    hex() {
        const {r, g, b} = this
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
}

class Pet {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        return `${this.name} is eating`
    }
}

class Cats extends Pet {
    constructor(name, age, livesleft = 9) {
        super(name, age)
        this.livesleft = livesleft
    }
    meow() {
        return 'meow'
    }
}

const monty = new Cats('monty', 9)

class Dog extends Pet { 
    bark() {
        return 'wooof'
    }
}

const corgi = new Dog('corgi', 13)