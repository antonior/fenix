const BookmarkDAO = require("../database/postgres/DAO/BookmarkDAO")
const BookDAO = require("../database/postgres/DAO/BookDAO")

async function getAllBookmarks() {
    return await BookmarkDAO.getAll()
}

async function addBookmark(bookId) {
    const newBookmark = await BookDAO.getById(bookId)
    if (!Number(newBookmark.id)) {
        throw Error('could not find book id')
    }
    await BookmarkDAO.add({ id: newBookmark.id, name: newBookmark.name})
}

async function deleteBookmark(id) {
    await BookmarkDAO.delete(id)
}

module.exports = {
    getAllBookmarks,
    addBookmark,
    deleteBookmark
}