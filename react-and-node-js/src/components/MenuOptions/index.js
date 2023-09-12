import styled from 'styled-components'

const menuOptions = ['CATEGORIES', 'BOOKMARKS', 'MY SHELF']

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
            <MenuOption><p>{option}</p></MenuOption>
          ))}
        </MenuOptionsList>
    )
}