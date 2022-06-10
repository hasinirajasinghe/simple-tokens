const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema ({
    name: String,
    userId: String,
    productId: String,
    rating: Number, 
    reviewText: String,
    timestamp: Date,
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review