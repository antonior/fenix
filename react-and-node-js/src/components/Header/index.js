import { Link } from 'react-router-dom';
import Logo from '../Logo'
import MenuIcons from '../MenuIcons';
import MenuOptions from '../MenuOptions'
import styled from 'styled-components';

const AppHeader = styled.header`
  background-color:white;
  display: flex;
  justify-content: center;
`

export default function Header() {
    return (
        <AppHeader>
          <Link to='/'>
            <Logo/>
          </Link>
          <MenuOptions/>
          <MenuIcons/>
        </AppHeader>
    )
}