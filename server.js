const express = require('express')
const app = express()
const PORT = 4000
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const methodsOverride = require('method-override')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
require('dotenv').config()

require('./config/connection')
require('./config/passport')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(methodsOverride('_method'))
app.use(cookieParser())
app.use(session({
    secret: 'CoolCards',
    resave: false,
    saveUninitialized: true,
    // try to keep user logged in for 1 hour???
    cookie: {
        secure: false,
        maxAge: 3600000 //1 hour
    }
  }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/reviews', reviewRoutes)
app.use('/', require('./routes/authRoutes'))

// Redirects to the main page 
app.get('/', (req,res) => {
    res.redirect('/products/')
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})