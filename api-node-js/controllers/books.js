const { getAllBooks, getBookById, addBook : addBookService, editBook : editBookService, deleteBook : deleteBookService } = require("../services/books")
const HttpStatus = require('http-status-codes')


async function getBooks(req, res) {
    try {
        const books = await getAllBooks()
        res.send(books)
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

async function getBook(req, res) {
    try {
        const id = req.params.id
        if (Number(id)) {
            const book = await getBookById(id)
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

async function addBook(req, res) {
    try {
        const newBook = req.body
        if (newBook.id) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("Do not set an id. It will be set automatically")
            return
        }
        if (!newBook.name?.length > 0) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("name must not be empty")
            return
        }

        await addBookService(newBook)

        res.status(HttpStatus.StatusCodes.CREATED)
        res.send("Book added")
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

async function editBook(req, res) {
    try {
        const id = req.params.id
        if (!Number(id)) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("Invalid id")
            return
        }
        const changes = req.body
        
        await editBookService(id, changes)

        res.status(HttpStatus.StatusCodes.OK)
        res.send("Book edited")
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

async function deleteBook(req, res) {
    try {
        const id = req.params.id
        if (Number(id)) {
            await deleteBookService(id)
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