const express = require('express')
const app = express()
const book_router = require('./books_router')
const category_router = require('./categories_router')

app.use('/book', book_router)
app.use('/category', category_router)

module.exports = app
