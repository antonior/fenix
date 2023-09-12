import Header from './components/Header'
import Search from './components/Search'
import RecentLaunches from './components/RecentLaunches'
import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
`

export default function App() {
  return (
    <AppContainer>
      <Header/>
      <Search/>
      <RecentLaunches/>
    </AppContainer>
  );
}