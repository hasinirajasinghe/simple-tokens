require('./connection')
const Product = require('../models/product')
const productSeeds = require('./seeds.json')

Product.deleteMany({})
.then(() => Product.insertMany(productSeeds))
.then((products) => {
    console.log(products)
})
.catch(console.error)
.finally(() => {
    process.exit()
})