import styled from 'styled-components'
import { Link } from 'react-router-dom'

const menuOptions = ['CATEGORIES', 'BOOKMARKS', 'SHELF']

const MenuOptionsList = styled.ul`
  display: flex;
`
const MenuOption = styled.li`
  min-width: 120px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
`

export default function MenuOptions() {
    return (
        <MenuOptionsList>
          { menuOptions.map( option => (
            <Link to={`/${option.toLowerCase()}`}>
              <MenuOption><p>{option}</p></MenuOption>
            </Link>
          ))}
        </MenuOptionsList>
    )
}