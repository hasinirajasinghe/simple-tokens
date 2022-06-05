const User = require('../models/user')

// Fetches all the users 
const getAllUsers = (req,res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.json(users)
    })
}

// Show sign up page 
const showSignUpPage = (req,res) => {
    res.render('sign_up_page')
}

// Creates new user 
const createNewUser = (req,res) => {
    User.create(req.body, (err) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.redirect('/log-in')
    })
}

// Show log in page 
const showLogInPage = (req,res) => {
    res.render('log_in_page')
}

// Authenticate the user and redirects to homepage
const logInUser = (req, res) => {
    // TODO: Add authentication code
    res.redirect('/')
}

// Fetches user by user ID
const getUserById = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.json(user)
    })
}

module.exports = {
    getAllUsers,
    showSignUpPage,
    createNewUser,
    showLogInPage,
    logInUser,
    getUserById 
}