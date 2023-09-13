const {Router} = require("express")
const {getBooks, getBook, addBook, editBook, deleteBook} = require("../controllers/books")
const router = Router()

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', addBook)
router.patch('/:id', editBook)
router.delete('/:id', deleteBook)

module.exports = router