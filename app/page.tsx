import LatestMovies from './components/latestMovies'
import Navbar from './components/navbar'
import Heading from './components/heading'
import HomeButtons from './components/homeButtons'
import ScoreBoard from './components/scoreBoard'


export default function Home() {

  return (
    <div>
      <Navbar />
      <Heading />
      <LatestMovies />
      <HomeButtons />
      {/* <ScoreBoard/> */}
    </div>
  );
}