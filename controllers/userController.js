const User = require('../models/user')

const addToCart = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        console.log(req.body)
        let productName = req.body.name
        let productFound = user.cart.find((cartItem) => cartItem.name === productName)
        if (productFound) {
            productFound.quantity += parseInt(req.body.quantity)
        } else {
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

        res.redirect(`/users/${req.params.id}/shopping-cart`)
    })
}

module.exports = {
    addToCart, 
    viewCart, 
    deleteCartItem
}