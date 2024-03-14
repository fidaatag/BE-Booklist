const express = require('express')
const router = express.Router()
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category_controller');

// Get All Category
router.get('/', getCategories)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router;