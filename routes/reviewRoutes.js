const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviewsController')

// Fetches all the reviews 
router.get('/', reviewCtrl.getAllReviews)

// Offers for to create new review review
router.get('/new', reviewCtrl.showNewReviewPage)

// Creates new review 
router.post('/', reviewCtrl.createNewReview)

// Fetches reviews by product ID
router.get('/:productId', reviewCtrl.getAllReviewsForProduct)

// Fetches review by ID and edit 
router.get('/:id/edit', reviewCtrl.editReview)

// Updates a review 
router.put('/:id', reviewCtrl.updateReview)

// Deletes a review 
router.delete('/:id', reviewCtrl.deleteReview)

module.exports = router