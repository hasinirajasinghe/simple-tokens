const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name: String,
    description: String,
    imagePath : [String],
    quantity: Number,
    price: Number
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product