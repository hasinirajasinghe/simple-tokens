const User = require('../models/user')

const viewCart = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        res.render('shopping-cart-page', {user})
    })
}

const addToCart = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        user.cart.push(req.body)
        user.save()
        res.redirect('/')
    })
}

module.exports = {
    viewCart,
    addToCart 
}