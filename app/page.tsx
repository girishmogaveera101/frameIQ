"use client"

import Navbar from './components/navbar';
import react, { useState, useEffect } from 'react'
import LatestMovies from './components/latestMovies'
const token = process.env.NEXT_PUBLIC_TMDB_URI;


interface MovieData {
  backdrops: any[];
  file_path: string;
}


export default function Home() {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [nu, setNu] = useState<number>(100)
  const [imageURL, setImageURL] = useState<string>("")
  const [title, setTitle] = useState<string>("");

  const f2 = async () => {
    const randomNumber = Math.floor(Math.random() * 500 + 500);
    setNu(randomNumber)
    const res = await fetch(`https://api.themoviedb.org/3/movie/${nu}/images`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }
    );
    const res2 = await fetch(`https://api.themoviedb.org/3/movie/${nu}?language=en-US`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }
    );

    const resData = await res.json();
    setMovie(resData)
    setImageURL(`https://image.tmdb.org/t/p/original${resData.backdrops[0].file_path}`);
    const resData2 = await res2.json();
    setTitle(resData2.title)
    console.log("Image Data",resData)
    console.log("Info : ",resData2)
    console.log("title : ",resData2.title)
    console.log("Release Date : ",resData2.release_date)
    console.log("desrcption : ",resData2.overview)
    console.log("Budget : ",resData2.budget)
    console.log("IMDB rating : ",resData2.vote_average)



  }




  return (<>

    <Navbar />
    <h1 className="text-7xl mt-10 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      WELCOME TO FRAME.IQ
    </h1>
    <LatestMovies />

    <center>
      <button onClick={(e) => { f2() }} className="rounded h-15 text-xl mt-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black">Start the Game</button>
    </center>
    <div>
      {imageURL && (
        <div className="mx-[40%] mt-5">
          <img src={imageURL} className='w-[100%]' alt="Movie Poster" />
          <p className="text-black text-xl">{title}</p>
        </div>
      )}

    </div>

  </>
  );
}