const Book = require("../book")

class BookDAO {
    static async getAll() {
        return await Book.findAll();
    }
    
    static async getById(id) {
        return await Book.findByPk(id)
    }
    
    static async add(book) {
        await Book.create(book)
    }
    
    static async edit(book) {
        book.save()
    }
    
    static async delete(id) {
        const book = await Book.findByPk(id)
        await book.destroy()
    }
}

module.exports = BookDAO