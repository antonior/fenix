import Input from "../Input"
import styled from "styled-components"
import { useState } from "react"
import { books } from "./searchData"

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

export default function Search() {
    const [searchedBooks, setSearchedBooks] = useState([])
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
                <Book>
                    <img src={book.image} alt={book.name}/>
                    <p>{book.name}</p>
                </Book>
            ))}
        </SearchContainer>
    )
}