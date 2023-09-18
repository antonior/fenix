function bookmarksRouter(bookmarkController) {
    const {Router} = require("express")
    const router = Router()

    router.get('/', (req, res) => { return bookmarkController.getBookmarks(req, res) })
    router.post('/:id', (req, res) => { return bookmarkController.addBookmark(req, res) })
    router.delete('/:id', (req, res) => { return bookmarkController.deleteBookmark(req, res) })

    return router
}

module.exports = bookmarksRouter