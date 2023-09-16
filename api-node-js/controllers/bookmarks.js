const { getAllBookmarks, addBookmark : addBookmarkService, deleteBookmark : deleteBookmarkService } = require("../services/bookmarks")
const HttpStatus = require('http-status-codes')


async function getBookmarks(req, res) {
    try {
        const bookmarks = await getAllBookmarks()
        res.send(bookmarks)
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

async function addBookmark(req, res) {
    try {
        const bookId = req.params.id
        if (!Number(bookId)) {
            res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY)
            res.send("Invalid id")
            return
        }

        await addBookmarkService(bookId)

        res.status(HttpStatus.StatusCodes.CREATED)
        res.send("Bookmark added")
    } catch (error) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        res.send(error.message)
    }
}

async function deleteBookmark(req, res) {
    try {
        const id = req.params.id
        if (Number(id)) {
            await deleteBookmarkService(id)
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

module.exports = {
    getBookmarks,
    addBookmark,
    deleteBookmark
}