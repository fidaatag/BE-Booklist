const { books, categories } = require('../models')

const createBook = async (req, res) => {
	try {
		const { title, author, pub_date, publiser, number_page, categories_name } = req.body
		const newBook = await books.create({
			title,
			author,
			pub_date,
			publiser,
			number_page,
		})

		const newCategories = []
		for (let i = 0; i < categories_name.length; i++) {
			const category = categories_name[i]

			let category_current = await categories.findOne({ where: { category: category } })

			if (!category_current) {
				category_current = await categories.create({ category })
			}

			newCategories.push(category_current)
		}

		await newBook.addCategories(newCategories)

		res.status(201).json({
			code: 201,
			message: 'create book successfully',
			data: {
				book: newBook,
				categories: newCategories
			}
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

const getBooks = async (req, res) => {
	try {
		let book;
		const { category_id } = req.query

		if (category_id) {
			const selectedCategory = await categories.findByPk(category_id);
			if (!selectedCategory) {
				return res.status(404).json({
					code: 404,
					message: 'Category not found',
					data: null
				});
			}

			book = await selectedCategory.getBooks({
				include: [
					{
						model: categories,
						as: 'categories',
						through: { attributes: [] },
						attributes: ['id', 'category', 'createdAt', 'updatedAt']
					}
				]
			});

		} else {
			book = await books.findAll({
				include: [
					{
						model: categories,
						as: 'categories',
						through: {
							attributes: [] // Menyembunyikan atribut dari tabel perantara
						},
						attributes: ['id', 'category', 'createdAt', 'updatedAt'] // Menyertakan atribut yang diinginkan dari tabel categories
					}
				]
			});
		}

		return res.status(200).json({
			code: 200,
			message: 'books found',
			data: book
		})

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			code: 500,
			message: 'Internal server error',
			data: null
		})
	}
}

const getBookById = async (req, res) => {
	try {
		const book = await books.findByPk(req.params.id, {
			include: [
				{
					model: categories,
					as: 'categories',
					through: {
						attributes: [] // Menyembunyikan atribut dari tabel perantara
					},
					attributes: ['id', 'category', 'createdAt', 'updatedAt'] // Menyertakan atribut yang diinginkan dari tabel categories
				}
			]
		})
		return res.json({
			code: 200,
			message: 'book found',
			data: book
		});

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			code: 500,
			message: 'Internal server error',
			data: null
		})
	}
}

const updateBook = async (req, res) => {
	try {
		const { title, author, pub_date, publiser, number_page, review, categories_name } = req.body;
		const book = await books.findByPk(req.params.id)

		Object.assign(book, req.body)

		if (categories_name) {
			const category_Promises = categories_name.map(async category_name => {
				let category = await categories.findOne({ where: { category: category_name } })

				if (!category) {
					category = await categories.create({ category: category_name })
				}

				return category
			})

			const updateCategories = await Promise.all(category_Promises)

			await book.setCategories(updateCategories)
		}

		await book.save()

		return res.json({
			code: 200,
			message: 'book update successfully',
			data: {
				book: book,
				categories: categories_name
			}
		});


	} catch (error) {
		console.log(error)
		return res.status(500).json({
			code: 500,
			message: 'Internal server error',
			data: null
		})
	}
}

const deleteBook = async (req, res) => {
	try {
		const book = await books.findByPk(req.params.id)
		await book.destroy({
			where: { id: req.params.id }
		})
		
		return res.status(200).json({
			code: 200,
			message: 'book deleted successfully',
			data: book
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
	getBooks,
	createBook,
	getBookById,
	updateBook,
	deleteBook
}