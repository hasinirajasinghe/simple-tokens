const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name: String,
    quantity: Number,
    price: Number
})

const userSchema = new mongoose.Schema ({
    firstname: String, 
    lastname: String, 
    email: String,
    password: String,
    cart: [productSchema]
})

const User = mongoose.model("User", userSchema)

module.exports = User