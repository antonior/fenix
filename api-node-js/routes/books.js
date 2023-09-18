function booksRouter(bookController) {
    
    const {Router} = require("express")
    const router = Router()
    
    router.get('/', (req, res) => { return bookController.getBooks(req, res) })
    router.get('/:id', (req, res) => { return bookController.getBook(req, res) })
    router.post('/', (req, res) => { return bookController.addBook(req, res) })
    router.patch('/:id', (req, res) => { return bookController.editBook(req, res) })
    router.delete('/:id', (req, res) => { return bookController.deleteBook(req, res) })

    return router
}


module.exports = booksRouter