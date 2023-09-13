const { getAllBooks, getBookById, addBook : addBookService, editBook : editBookService, deleteBook : deleteBookService } = require("../services/books")
const HttpStatus = require('http-status-codes')


function getBooks(req, res) {
    try {
        const books = getAllBooks()
        res.send(books)
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

function getBook(req, res) {
    try {
        const id = req.params.id
        if (id && Number(id)) {
            const book = getBookById(id)
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

function addBook(req, res) {
    try {
        const newBook = req.body
        if (!Number(newBook.id)) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("id must be a number")
            return
        }
        if (!newBook.name?.length > 0) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("name must not be empty")
            return
        }

        addBookService(newBook)

        res.status(HttpStatus.StatusCodes.CREATED)
        res.send("Book added")
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

function editBook(req, res) {
    try {
        const id = req.params.id
        if (!Number(id)) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("Invalid id")
            return
        }
        const changes = req.body
        
        editBookService(id, changes)

        res.status(HttpStatus.StatusCodes.OK)
        res.send("Book edited")
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

function deleteBook(req, res) {
    try {
        const id = req.params.id
        if (id && Number(id)) {
            deleteBookService(id)
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

module.exports = {
    getBooks,
    getBook,
    addBook,
    editBook,
    deleteBook
}