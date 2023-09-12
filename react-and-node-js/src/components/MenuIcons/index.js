import perfil from '../../images/perfil.svg'
import sacola from '../../images/sacola.svg'
import styled from 'styled-components'

const menuIcons = [perfil, sacola]

const MenuIconsList = styled.ul`
  display: flex;
  align-items: center;
`
const MenuIcon = styled.li`
  margin-right: 40px;
  width: 25px;
`

export default function MenuIcons() {
    return (
        <MenuIconsList>
          { menuIcons.map( icon => (
            <MenuIcon><img src={icon} alt=''></img></MenuIcon>
          ))}
        </MenuIconsList>
    )
}