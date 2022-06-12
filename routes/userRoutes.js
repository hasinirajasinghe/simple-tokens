const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

// Add to cart
router.put('/:id/shopping-cart', userCtrl.addToCart)

// Shows user shopping cart
router.get('/:id/shopping-cart', userCtrl.viewCart)

// Delete cart item 
router.delete('/:id/shopping-cart', userCtrl.deleteCartItem)

module.exports = router