const {Router} = require("express")
const BookmarkController = require("../controllers/BookmarkController")
const router = Router()

router.get('/', BookmarkController.getBookmarks)
router.post('/:id', BookmarkController.addBookmark)
router.delete('/:id', BookmarkController.deleteBookmark)

module.exports = router