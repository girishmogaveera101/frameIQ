
// import Navbar from './components/navbar';
import Link from 'next/link';
import LatestMovies from './components/latestMovies'


export default function Home() {





  return (<>

    {/* <Navbar /> */}
    <h1 className="md:text-7xl text-5xl md:mt-25 mt-20 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      WELCOME TO FRAME.IQ
    </h1>
    <LatestMovies />

    <center>

      <Link href='/game'>
        <button className="rounded h-15 text-xl mt-10 hover:bg-black hover:w-70 font-bold transition-all duration-300 w-60 bg-purple-800">Start Game</button>
      </Link>
<br/>
      <Link href='/contribute'>
        <button className="rounded h-15 text-xl my-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-45 bg-black">Contribute</button>
      </Link>
    </center>

  </>
  );
}