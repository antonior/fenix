class BookmarkService {
    constructor(opts) {
        this.BookmarkDAO = opts.BookmarkDAO
        this.BookDAO = opts.BookDAO
    }

    async getAllBookmarks() {
        return await this.BookmarkDAO.getAll()
    }
    
    async addBookmark(bookId) {
        const newBookmark = await this.BookDAO.getById(bookId)
        if (!newBookmark.id) {
            throw Error('could not find book id')
        }
        await this.BookmarkDAO.add({ id: newBookmark.id, name: newBookmark.name})
    }
    
    async deleteBookmark(id) {
        await this.BookmarkDAO.delete(id)
    }
}

module.exports = BookmarkService