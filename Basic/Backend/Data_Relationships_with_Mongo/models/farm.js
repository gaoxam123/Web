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

//                                                  MEDIUM SIZE

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter']
    }
})

const Product = mongoose.model('Product', productSchema)

// Product.insertMany([
//     {name: 'melon', price: 5, season: 'summer'},
//     {name: 'apple', price: 6, season: 'winter'},
// ])

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}] // refer to which model?
})

const Farm = mongoose.model('Farm', farmSchema)

const makeFarm = async() => {
    const farm = new Farm({name: 'abc', city: 'def'})
    const melon = await Product.findOne({name: 'melon'})
    farm.products.push(melon) // this only stores the object ID on the database
    await farm.save()
}

const addProduct = async() => {
    const farm = await Farm.find({})
    const watermelon = await Product.findOne({name: 'abc'})
    farm.products.push(watermelon)
    await farm.save()
}

// POPULATE TO REFER TO DATA


// BEFORE: products only stores the ids of the products
Farm.findOne({name: '???'})
.populate('products') // pass in the field name (attribute of the model Farm)
.then(farm => console.log(farm))
// AFTER: now products stores every info of the products