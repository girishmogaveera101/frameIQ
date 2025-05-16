import Navbar from './components/navbar';
import LatestMovies from './components/latestMovies'

export default function Home() {


  return (<>

    <Navbar />
    <h1 className="text-4xl mt-10 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      WELCOME TO FRAMEFLIX
    </h1>
    <LatestMovies />


  </>
  );
}