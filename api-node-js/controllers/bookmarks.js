const BookmarkService = require("../services/bookmarks")
const HttpStatus = require('http-status-codes')

class BookmarkController {
    static async getBookmarks(req, res) {
        try {
            const bookmarks = await BookmarkService.getAllBookmarks()
            res.send(bookmarks)
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    static async addBookmark(req, res) {
        try {
            const bookId = req.params.id
            if (!Number(bookId)) {
                res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
                res.send("Invalid id")
                return
            }

            await BookmarkService.addBookmark(bookId)

            res.status(HttpStatus.StatusCodes.CREATED)
            res.send("Bookmark added")
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(error.message)
        }
    }

    static async deleteBookmark(req, res) {
        try {
            const id = req.params.id
            if (Number(id)) {
                await BookmarkService.deleteBookmark(id)
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