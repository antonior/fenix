const BookDAO = require("../database/postgres/DAO/BookDAO")

class BookService {
    static async getAllBooks() {
        return await BookDAO.getAll()
    }

    static async getBookById(id) {
        return await BookDAO.getById(id)
    }

    static async addBook(newBook) {
        await BookDAO.add(newBook)
    }

    static async editBook(id, changes) {
        let editedBook = await BookDAO.getById(id)
        
        if (Object.hasOwn(changes, "name")) {
            editedBook.name = changes.name
        }
        
        if (!editedBook.name?.length > 0) {
            throw Error("name must not be empty")
        }
        
        await await BookDAO.edit(editedBook)
    }

    static async deleteBook(id) {
        await BookDAO.delete(id)
    }
}

module.exports = BookService