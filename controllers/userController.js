const User = require('../models/user')

const addToCart = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err) {
            res.status(400).json(err)
            return
        }

        let productName = req.body.name
        // check if the product was already part of the cart
        let productFound = user.cart.find((cartItem) => cartItem.name === productName)
        // if the product was part of the cart then just increase the existing quantity by the new quantity they wanted
        if (productFound) {
            productFound.quantity += parseInt(req.body.quantity)
        } else {
            // The product was not part of the cart so just push in a new item
            user.cart.push(req.body)
        }
        user.save()
        res.redirect('/')
    })
}

const viewCart = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        res.render('shopping-cart-page', {user})
    })
}

const deleteCartItem = (req,res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            res.status(400).json(err)
            return
        }

        let productName = req.body.name
        let filteredCart = user.cart.filter((cartItem) => cartItem.name !== productName)
        user.cart = filteredCart
        user.save()

        res.redirect(`/users/${user._id}/shopping-cart`)
    })
}

const cartCheckout = (req,res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        user.cart = []
        user.save()
        res.redirect('/')
    })
}

module.exports = {
    addToCart, 
    viewCart, 
    deleteCartItem,
    cartCheckout
}