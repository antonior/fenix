const Book = require("../models/book")

class BookDAO {
    async getAll() {
        return await Book.find({})
    }
    
    async getById(id) {
        return await Book.findById(id)
    }
    
    async add(book) {
        return await Book.create(book)
    }
    
    async edit(book) {
        await Book.findByIdAndUpdate(book._id, book)
    }
    
    async delete(id) {
        await Book.findByIdAndDelete(id)
    }
}

module.exports = BookDAO