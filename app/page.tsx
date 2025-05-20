
// import Navbar from './components/navbar';
import Link from 'next/link';
import LatestMovies from './components/latestMovies'


export default function Home() {





  return (<>

    {/* <Navbar /> */}
    <h1 className="text-7xl md:mt-25 mt-36 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      WELCOME TO FRAME.IQ
    </h1>
    <LatestMovies />

    <center>

      <Link href='/webContribute'>
        <button className="rounded h-15 text-xl mt-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black">Start Game</button>
      </Link>
<br/>
      <Link href='/contribute'>
        <button className="rounded h-15 text-xl mt-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-45 bg-black">Contribute</button>
      </Link>
    </center>

  </>
  );
}