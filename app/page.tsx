
"use client"

import Link from 'next/link';
import LatestMovies from './components/latestMovies'
import { useSearchParams } from 'next/navigation';
import Loading from './components/loading'
import { useState, useEffect } from 'react';


export default function Home() {

  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingStatus(false)
    }, 2000);
  }, []);

  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  console.log(username)




  return (<div className=''>

    {loadingStatus && <Loading />}

    <h1 className="md:text-7xl text-4xl md:mt-25 mt-30 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      One Frame. Three Shots. Don’t Screw It Up.
    </h1>
    <p className="md:text-3xl hidden md:flex justify-center text-xl md:mt-2 mt-2 md:text-center font-light bg-gradient-to-r from-blue-400 via-pink-500 to-green-500 bg-clip-text text-transparent">
      Get it right, feel like a god. Get it wrong, feel like a clown.
    </p>
    <LatestMovies />
    { }
    <center>

      <Link href='/game'>
        <button className="rounded h-15 text-xl mt-10 hover:bg-black hover:w-70 font-bold transition-all duration-300 w-60 bg-blue-800">Start Game</button>
      </Link>
      <br />
      <Link href='/contribute'>
        <button className="rounded h-15 text-xl my-10 hover:bg-green-600 hover:w-70 font-bold transition-all duration-300 w-45 bg-black">Contribute</button>
      </Link>
    </center>



  </div>
  );
}