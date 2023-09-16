const fs = require("fs")
const Bookmark = require("../database/bookmark")
const Book = require("../database/book")

async function getAllBookmarks() {
    return await Bookmark.findAll();
}

async function addBookmark(bookId) {
    const newBookmark = await Book.findByPk(bookId)
    if (!Number(newBookmark.id)) {
        throw Error('could not find book id')
    }
    await Bookmark.create({ id: newBookmark.id, name: newBookmark.name})
}

async function deleteBookmark(id) {
    const bookmark = await Bookmark.findByPk(id)
    await bookmark.destroy()
}

module.exports = {
    getAllBookmarks,
    addBookmark,
    deleteBookmark
}