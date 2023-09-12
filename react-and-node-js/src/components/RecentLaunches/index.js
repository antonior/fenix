import { recentLaunches } from './recentLaunchesData'
import { Heading } from '../Heading'
import RecommendationCard from '../RecommendationCard'
import bookImage from '../../images/livro2.png'
import styled from 'styled-components'
const RecentLaunchesContainer = styled.section`
   background-color: #EBECEE;
   padding-bottom: 20px;
   display: flex;
   flex-direction: column;
`
const NewBooksContainer = styled.div`
   margin-top: 30px;
   display: flex;
   width: 100%;
   justify-content: center;
   cursor: pointer;
`
export default function RecentLaunches() {
   return (
       <RecentLaunchesContainer>
           <Heading
               color="#EB9B00"
               fontSize="36px"
           >
               RECENT LAUNCHES
           </Heading>
           <NewBooksContainer>
               {recentLaunches.map( book => (
                   <img src={book.image} alt={book.name}/>
               ))}
           </NewBooksContainer>
           <RecommendationCard
               heading="You may be interested on"
               subheading="Angular 11"
               description="Building an aplication with Google platform"
               image={bookImage}
           />
       </RecentLaunchesContainer>
   )
}