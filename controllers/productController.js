const Product = require('../models/product')

// Fetch all the products 
const getAllProducts = async (req, res) => {
    console.log(req.user);
    Product.find({}, (err, products) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.render('homepage', {products, user: req.user}) 
    })
}

// Show product by ID 
const showProduct = (req,res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.render('product_detail_page', {product, user: req.user})
    })
}

module.exports = {
    getAllProducts,
    showProduct
}