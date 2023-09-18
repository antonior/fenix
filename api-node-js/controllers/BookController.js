const HttpStatus = require('http-status-codes')

class BookController {
    constructor(opts) {
        this.BookService = opts.BookService
    }
    
    async getBooks(req, res) {
        try {
            const books = await this.BookService.getAllBooks()
            res.send(books)
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async getBook(req, res) {
        try {
            const id = req.params.id
            if (id) {
                const book = await this.BookService.getBookById(id)
                res.send(book)
            } else {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
            }
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async addBook(req, res) {
        try {
            const newBook = req.body
            if (newBook.id || newBook._id) {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Do not set an id. It will be set automatically")
                return
            }
            if (!newBook.name?.length > 0) {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("name must not be empty")
                return
            }

            await this.BookService.addBook(newBook)

            res.status(HttpStatus.StatusCodes.CREATED)
            res.send("Book added")
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async editBook(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
                return
            }
            const changes = req.body
            
            await this.BookService.editBook(id, changes)

            res.status(HttpStatus.StatusCodes.OK)
            res.send("Book edited")
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async deleteBook(req, res) {
        try {
            const id = req.params.id
            if (id) {
                await this.BookService.deleteBook(id)
                res.send(`Book ${id} deleted`)
            } else {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
            }
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }
}

module.exports = BookController