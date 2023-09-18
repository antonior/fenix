const Bookmark = require("../models/bookmark")

class BookmarkDAO {
    async getAll() {
        return await Bookmark.find({})
    }
    
    async add(bookmark) {
        return await Bookmark.create(bookmark)
    }
    
    async delete(id) {
        await Bookmark.findByIdAndDelete(id)
    }
}

module.exports = BookmarkDAO