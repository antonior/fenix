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
          <Logo/>
          <MenuOptions/>
          <MenuIcons/>
        </AppHeader>
    )
}