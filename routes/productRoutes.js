const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productController')

// Fetches all the product items 
router.get('/', productCtrl.getAllProducts)

// Fetches prodcut by product ID
router.get('/:id', productCtrl.showProduct)

module.exports = router