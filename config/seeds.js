require('dotenv').config()
require('./connection')
const User = require('../models/user')
const Product = require('../models/product')

const userSeeds = require('./userSeeds.json')
const productSeeds = require('./productSeeds.json')

User.deleteMany({})
.then(() => User.insertMany(userSeeds))
.then((users) => {
    console.log(users)
})
.catch(console.error)

Product.deleteMany({})
.then(() => Product.insertMany(productSeeds))
.then((products) => {
    console.log(products)
})
.catch(console.error)
.finally(() => {
    process.exit();
})