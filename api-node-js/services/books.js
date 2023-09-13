const fs = require("fs")

function getAllBooks() {
    return JSON.parse(fs.readFileSync("books.json"))
}

function getBookById(id) {
    return (
        JSON.parse(fs.readFileSync("books.json"))
        .filter(livro => livro.id === id)[0]
    )
}

function addBook(newBook) {
    const currentBooks = JSON.parse(fs.readFileSync("books.json"))
    const newBookList = [ ...currentBooks, newBook ]
    fs.writeFileSync("books.json", JSON.stringify(newBookList))
}

function editBook(id, changes) {
    let allBooks = JSON.parse(fs.readFileSync("books.json"))
    const editedIndex = allBooks.findIndex(book => book.id === id)
    const editedBook = {...allBooks[editedIndex], ...changes}
    allBooks[editedIndex] = editedBook

    if (!Number(editedBook.id)) {
        throw Error("id must be a number")
    }
    if (!editedBook.name?.length > 0) {
        throw Error("name must not be empty")
    }
    
    fs.writeFileSync("books.json", JSON.stringify(allBooks))
}

function deleteBook(id) {
    const remainingBooks = 
        JSON.parse(fs.readFileSync("books.json"))
        .filter(book => book.id !== id)

        fs.writeFileSync("books.json", JSON.stringify(remainingBooks))
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    editBook,
    deleteBook
}