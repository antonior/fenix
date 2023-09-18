const Book = require("../models/book")

class BookDAO {
    static async getAll() {
        return await Book.find({})
    }
    
    static async getById(id) {
        return await Book.findById(id)
    }
    
    static async add(book) {
        console.log(`BookDAO.add() id: ${book.id} _id: ${book._id} book: ${book} bookStringify: ${JSON.stringify(book)}`);
        return await Book.create(book)
    }
    
    static async edit(book) {
        console.log(`BookDAO.edit() id: ${book.id} _id: ${book._id} book: ${book} bookStringify: ${JSON.stringify(book)} book.toJSON: ${book.toJSON()}`);
        await Book.findByIdAndUpdate(book._id, book)
    }
    
    static async delete(id) {
        await Book.findByIdAndDelete(id)
    }
}

module.exports = BookDAO