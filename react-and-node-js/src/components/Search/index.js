import Input from "../Input"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { getBooks, addBook } from "../../services/books"
import { insertBookmark as insertBookmarkService } from "../../services/bookmarks"

const SearchContainer = styled.section`
    background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 100%;
    width: 100%;
`
const Heading = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const SubHeading = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`

const Book = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

const NewBookArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid white;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }
`

export default function Search() {
    const [searchedBooks, setSearchedBooks] = useState([])
    const [books, setBooks] = useState([])
    const [newBookImage, setNewBookImage] = useState("")
    const [newBookName, setNewBookName] = useState("")

    useEffect( () => {
        fetchBooks()
    }, [])

    async function fetchBooks() {
        const booksFromAPI = await getBooks()
        setBooks(booksFromAPI)
    }

    async function insertBookmark(id) {
        await insertBookmarkService(id)
        alert('Book inserted in bookmarks')
    }

    function insertBook(event) {
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            setNewBookImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: ", error);
        }
    }

    function changeNewBookName(event) {
        setNewBookName(event.target.value)
    }

    async function addNewBook() {
        const result = await addBook(newBookName, newBookImage)
        console.log("Result do addNewBook: ", result);
    }

    return (
        <SearchContainer>
            <Heading>Do you know where to start?</Heading>
            <SubHeading>Find your book in our shelf.</SubHeading>
            <Input 
                placeholder="Put your next reading"
                onBlur={event => {
                    setSearchedBooks(
                        books.filter(book => book.name.includes(event.target.value))
                    )
                }} 
            />
            { searchedBooks.map( book => (
                <Book onClick={() => insertBookmark(book._id)}>
                    <img src={book.image} alt={book.name}/>
                    <p>{book.name}</p>
                </Book>
            ))}
            <NewBookArea>
                <input accept="image/*" type="file" onChange={insertBook} />
                <input type="text" onChange={changeNewBookName} />
                <button onClick={addNewBook}>Criar</button>
                <br/>
                <img src={newBookImage} alt={newBookName} />
            </NewBookArea>
        </SearchContainer>
    )
}