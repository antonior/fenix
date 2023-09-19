import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { deleteBookmark, getBookmarks } from '../services/bookmarks';
import bookImage from '../images/livro.png'

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
`
const BookmarksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const BookmarkItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    text-align: center;
    padding: 0 100px;
    p {
        width: 200px;
        color: #FFF;
    }
    img {
        width: 100px;
    }
    &:hover {
        border: 1px solid white;
    }
`

const Heading = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px
`

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  async function fetchBookmarks() {
    const bookmarksFromAPI = await getBookmarks()
    setBookmarks(bookmarksFromAPI)
  }

  useEffect(() => { fetchBookmarks() }, [])

  async function onclickdeleteBookmark(id) {
    await deleteBookmark(id)
    await fetchBookmarks()
    alert('Bookmark deleted')
  }

  return (
    <AppContainer>
     <div>
       <Heading>These are your bookmarks:</Heading>
       <BookmarksContainer>
         {
           bookmarks.length !== 0 ? bookmarks.map(bookmark => (
             <BookmarkItem onClick={ () => onclickdeleteBookmark(bookmark._id) }>
               <p>{bookmark.name}</p>
               <img src={bookImage} alt={bookmark.name}/>
             </BookmarkItem>
           )) : null
         }
       </BookmarksContainer>
     </div>
   </AppContainer>
  );
}