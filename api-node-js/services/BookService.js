class BookService {
    constructor(opts) {
        this.BookDAO = opts.BookDAO
    }

    async getAllBooks() {
        return await this.BookDAO.getAll()
    }

    async getBookById(id) {
        return await this.BookDAO.getById(id)
    }

    async addBook(newBook) {
        await this.BookDAO.add(newBook)
    }

    async editBook(id, changes) {
        let editedBook = await this.BookDAO.getById(id)
        
        if (Object.hasOwn(changes, "name")) {
            editedBook.name = changes.name
        }
        
        if (!editedBook.name?.length > 0) {
            throw Error("name must not be empty")
        }
        
        await await this.BookDAO.edit(editedBook)
    }

    async deleteBook(id) {
        await this.BookDAO.delete(id)
    }
}

module.exports = BookService