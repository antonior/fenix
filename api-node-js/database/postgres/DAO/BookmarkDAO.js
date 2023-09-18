const Bookmark = require("../bookmark")

class BookmarkDAO {
    async getAll() {
        return await Bookmark.findAll()
    }
    
    async add(bookmark) {
        await Bookmark.create(bookmark)
    }
    
    async delete(id) {
        const bookmark = await Bookmark.findByPk(id)
        await bookmark.destroy()
    }
}

module.exports = BookmarkDAO