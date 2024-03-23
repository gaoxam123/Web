const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection opened')
    })
    .catch((err) => {
        console.log('error!')
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: [0, 'price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})


// function for any product in the schema
productSchema.methods.toggleonSale = function() {
    this.onSale = !this.onSale
    return this.save()
}

productSchema.methods.addcategories = function(newCat) {
    this.categories.push(newCat)
    return this.save()
}

// this refers to the instance of the schema
productSchema.methods.greet = function() {
    console.log('hi')
    console.log(`from ${this.name}`)
}

// this refers to the model itself
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema)

Product.fireSale().then(res => console.log(res))

const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'Bike Helmet'})
    console.log(foundProduct)
    await foundProduct.toggleonSale()
    console.log(foundProduct)
    await foundProduct.addcategories('outdoors')
    console.log(foundProduct)
}

findProduct()

// const bike = new Product({name: 'Tire Pump', price: 19.50, categories: ['Cycling']})

// bike.save()
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err)
//     })

Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 10}, {new: true, runValidators: true}) // for updates else not recognised as fault
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })