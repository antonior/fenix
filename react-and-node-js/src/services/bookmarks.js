import axios from "axios";

const bookmarksAPI = axios.create({baseURL: "http://localhost:8000/bookmarks"})

async function getBookmarks() {
    const response = await bookmarksAPI.get('/')
    return response.data
}

async function insertBookmark(id) {
    await bookmarksAPI.post(`/${id}`)
}

async function deleteBookmark(id) {
    await bookmarksAPI.delete(`/${id}`)
}

export {
    getBookmarks,
    insertBookmark,
    deleteBookmark
}