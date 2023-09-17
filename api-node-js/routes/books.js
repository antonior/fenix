const {Router} = require("express")
const BookController = require("../controllers/books")
const router = Router()

router.get('/', BookController.getBooks)
router.get('/:id', BookController.getBook)
router.post('/', BookController.addBook)
router.patch('/:id', BookController.editBook)
router.delete('/:id', BookController.deleteBook)

module.exports = router