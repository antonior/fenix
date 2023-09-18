const BookmarkDAO = process.env.DATABASE_OF_CHOICE === "postgres" ? require("../database/postgres/DAO/BookmarkDAO") : require("../database/mongodb/DAO/BookmarkDAO")
const BookDAO = process.env.DATABASE_OF_CHOICE === "postgres" ? require("../database/postgres/DAO/BookDAO") : require("../database/mongodb/DAO/BookDAO")

class BookmarkService {
    static async getAllBookmarks() {
        return await BookmarkDAO.getAll()
    }
    
    static async addBookmark(bookId) {
        const newBookmark = await BookDAO.getById(bookId)
        if (!newBookmark.id) {
            throw Error('could not find book id')
        }
        await BookmarkDAO.add({ id: newBookmark.id, name: newBookmark.name})
    }
    
    static async deleteBookmark(id) {
        await BookmarkDAO.delete(id)
    }
}

module.exports = BookmarkService