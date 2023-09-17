const Bookmark = require("../bookmark")

class BookmarkDAO {
    static async getAll() {
        return await Bookmark.findAll()
    }
    
    static async add(bookmark) {
        await Bookmark.create(bookmark)
    }
    
    static async delete(id) {
        const bookmark = await Bookmark.findByPk(id)
        await bookmark.destroy()
    }
}

module.exports = BookmarkDAO