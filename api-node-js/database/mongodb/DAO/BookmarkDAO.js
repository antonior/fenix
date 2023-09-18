const Bookmark = require("../models/bookmark")

class BookmarkDAO {
    static async getAll() {
        return await Bookmark.find({})
    }
    
    static async add(bookmark) {
        return await Bookmark.create(bookmark)
    }
    
    static async delete(id) {
        await Bookmark.findByIdAndDelete(id)
    }
}

module.exports = BookmarkDAO