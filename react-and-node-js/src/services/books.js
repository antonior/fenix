import axios from "axios";

const booksAPI = axios.create({baseURL: "http://localhost:8000/books"})

async function getBooks() {
    const response = await booksAPI.get('/')
    return response.data
}

async function addBook(name, image) {
    const response = await booksAPI.post('/', {name: name, image: image})
    return response.data
}

export {
    getBooks,
    addBook
}