const express = require('express')
const router = express.Router()
const { getBooks, createBook, getBookById, updateBook, deleteBook } = require('../controllers/books_controller')

// Get All Book
router.get('/', getBooks)
router.post('/', createBook)
router.get('/:id', getBookById)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router;