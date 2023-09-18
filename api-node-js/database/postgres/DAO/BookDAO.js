const Book = require("../book")

class BookDAO {
    async getAll() {
        return await Book.findAll();
    }
    
    async getById(id) {
        return await Book.findByPk(id)
    }
    
    async add(book) {
        await Book.create(book)
    }
    
    async edit(book) {
        book.save()
    }
    
    async delete(id) {
        const book = await Book.findByPk(id)
        await book.destroy()
    }
}

module.exports = BookDAO