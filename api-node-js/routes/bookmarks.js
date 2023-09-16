const {Router} = require("express")
const {getBookmarks, addBookmark, deleteBookmark} = require("../controllers/bookmarks")
const router = Router()

router.get('/', getBookmarks)
router.post('/:id', addBookmark)
router.delete('/:id', deleteBookmark)

module.exports = router