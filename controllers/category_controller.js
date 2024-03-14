const { books, categories, book_category } = require('../models')

const getCategories = async (req, res) => {
  try {
    const category = await categories.findAll({
      include: [{
        model: books,
        as: 'books',
        through: {
          model: book_category,
          attributes: [] // Jika Anda hanya membutuhkan data kategori dan buku saja
        }
      }]
    })

    return res.status(200).json({
      code: 200,
      message: 'categories found',
      data: category
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: null
    });
  }
}

const createCategory = async (req, res) => {
  try {
    const { categories_name } = req.body

    const newCategories = []
    for (let i = 0; i < categories_name.length; i++) {
      const category = categories_name[i]
      const newCategory = await categories.create({ category })

      newCategories.push(newCategory)
    }

    res.status(201).json({
      code: 201,
      message: 'create category successfully',
      data: newCategories,
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: null
    });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const category_ById = await categories.findByPk(req.params.id)
    if (category_ById) {
      await category_ById.update({
        category
      })

      return res.json({
        code: 200,
        message: 'category update successfully',
        data: category_ById
      })

    } else {
      return res.status(404).json({
        code: 404,
        message: 'category not found',
        data: null
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: null
    });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category_ById = await categories.findByPk(req.params.id)
    await category_ById.destroy({
      where: { id: req.params.id }
    })

    return res.status(200).json({
      code: 200,
      message: 'Category deleted successfully',
      data: category_ById
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: null
    });
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}