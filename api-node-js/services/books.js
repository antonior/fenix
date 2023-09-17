const BookDAO = require("../database/postgres/DAO/BookDAO")

async function getAllBooks() {
    return await BookDAO.getAll()
}

async function getBookById(id) {
    return await BookDAO.getById(id)
}

async function addBook(newBook) {
    await BookDAO.add(newBook)
}

async function editBook(id, changes) {
    let editedBook = await BookDAO.getById(id)
    
    if (Object.hasOwn(changes, "name")) {
        editedBook.name = changes.name
    }
    
    if (!editedBook.name?.length > 0) {
        throw Error("name must not be empty")
    }
    
    await await BookDAO.edit(editedBook)
}

async function deleteBook(id) {
    await BookDAO.delete(id)
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    editBook,
    deleteBook
}