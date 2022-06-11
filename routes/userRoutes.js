const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

// Shows user shopping cart
router.get('/:id/shopping-cart', userCtrl.viewCart)

// Add to cart
router.put('/:id/shopping-cart', userCtrl.addToCart)

module.exports = router