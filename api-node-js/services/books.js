const fs = require("fs")
const Book = require("../database/book")

async function getAllBooks() {
    return await Book.findAll();
}

async function getBookById(id) {
    return await Book.findByPk(id)
}

async function addBook(newBook) {
    await Book.create(newBook)
}

async function editBook(id, changes) {
    let editedBook = await Book.findByPk(id)
    
    if (Object.hasOwn(changes, "name")) {
        editedBook.name = changes.name
    }
    
    if (!editedBook.name?.length > 0) {
        throw Error("name must not be empty")
    }
    
    await editedBook.save()
}

async function deleteBook(id) {
    const book = await Book.findByPk(id)
    await book.destroy()
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    editBook,
    deleteBook
}