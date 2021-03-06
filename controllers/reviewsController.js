const Review = require('../models/review')

// Fetches all the reviews 
const getAllReviews = (req,res) => {
    Review.find({}, (err,reviews) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        // return json response because scripts are being used to display all reviews.
        res.json(reviews)
    })
}

// Offers a form to create new review
const showNewReviewPage = (req,res) => {
    // passing the productId to the next page so that it knows which product the review is being written for
    res.render('new_review', {productId: req.params.productId, user: req.user})
}

// Creates new review 
const createNewReview = (req,res) => {
    // add in the missing information because it is in the backend
    req.body.timestamp = Date.now();
    req.body.userId = req.user._id;
    req.body.name = req.user.name;
    Review.create(req.body, (err, review) => {
        if (err){
            res.status(400).json(err)
            return
        }
        
        res.redirect(`/products/${review.productId}`)
    })
}

// Fetches reviews for a product by product ID
const getAllReviewsForProduct = (req,res) => {
    Review.find({productId: req.params.productId}, (err,reviews) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.json(reviews)
    })
}

// Fetch by ID and edit review
const editReview = (req,res) => {
    Review.findById(req.params.id, (err,review) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.render('edit_review', {review, user: req.user})
    }) 
}

// Updates a review 
const updateReview = (req,res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,review) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.redirect(`/products/${review.productId}`)
    })
}

// Deletes a review
const deleteReview = (req,res) => {
    Review.findByIdAndDelete(req.params.id, (err,review) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.redirect(`/products/${review.productId}`)
    })
}

module.exports = {
    getAllReviews,
    showNewReviewPage,
    createNewReview,
    getAllReviewsForProduct,
    editReview,
    updateReview,
    deleteReview
}