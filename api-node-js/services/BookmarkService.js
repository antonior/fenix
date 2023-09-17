const BookmarkDAO = require("../database/postgres/DAO/BookmarkDAO")
const BookDAO = require("../database/postgres/DAO/BookDAO")

class BookmarkService {
    static async getAllBookmarks() {
        return await BookmarkDAO.getAll()
    }
    
    static async addBookmark(bookId) {
        const newBookmark = await BookDAO.getById(bookId)
        if (!Number(newBookmark.id)) {
            throw Error('could not find book id')
        }
        await BookmarkDAO.add({ id: newBookmark.id, name: newBookmark.name})
    }
    
    static async deleteBookmark(id) {
        await BookmarkDAO.delete(id)
    }
}

module.exports = BookmarkService