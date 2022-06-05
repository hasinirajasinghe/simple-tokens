const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema ({
    userId: String,
    productId: String,
    rating: Number, 
    reviewText: String,
    timeStamp: Date,
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review