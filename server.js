const express = require('express')
const app = express()
const PORT = 4000
const morgan = require('morgan')
const path = require('path')
const methodsOverride = require('method-override')
const expressEjsLayouts = require('express-ejs-layouts')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

require('./db/connection')

app.use(expressEjsLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
app.use(methodsOverride('_method'))

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/reviews', reviewRoutes)

// Redirects to the main page 
app.get('/', (req,res) => {
    res.redirect('/products/')
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})