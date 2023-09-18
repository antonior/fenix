const HttpStatus = require('http-status-codes')

class BookmarkController {
    constructor(opts) {
        this.BookmarkService = opts.BookmarkService
    }

    async getBookmarks(req, res) {
        try {
            const bookmarks = await this.BookmarkService.getAllBookmarks()
            res.send(bookmarks)
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async addBookmark(req, res) {
        try {
            const bookId = req.params.id
            if (!bookId) {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
                return
            }

            await this.BookmarkService.addBookmark(bookId)

            res.status(HttpStatus.StatusCodes.CREATED)
            res.send("Bookmark added")
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    async deleteBookmark(req, res) {
        try {
            const id = req.params.id
            if (id) {
                await this.BookmarkService.deleteBookmark(id)
                res.send(`Bookmark ${id} deleted`)
            } else {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
            }
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }
}

module.exports = BookmarkController