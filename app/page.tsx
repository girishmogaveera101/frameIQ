"use client"

import Navbar from './components/navbar';
import react, { useState, useEffect } from 'react'
import LatestMovies from './components/latestMovies'

interface Poster {
  file_path: string;
  // height: number;
  // width: number;
  // iso_639_1: string;
  // vote_average: number;
  // vote_count: number;
  // aspect_ratio: number;
}

interface MovieData {
  id: number;
  backdrops: any[];
  success: boolean;
}

interface f2 {
  name: string;
}

interface m2 {
  belongs_to_collection: f2[];
}



export default function Home() {

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [nu, setNu] = useState<number>(100)

  const [imageURL, setImageURL] = useState<string>("")
  const [title, setTitle] = useState<string>("");

  const f2 = async () => {
    const randomNumber = Math.floor(Math.random() * 500 + 100);
    setNu(randomNumber)
    const res = await fetch(`https://api.themoviedb.org/3/movie/${nu}/images`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzBiOGJhZjE4MjUyN2Q5OTFiODM3MGMwZDRmNThkOCIsIm5iZiI6MTc0NzU0NzA0Ni4yMTgsInN1YiI6IjY4Mjk3M2E2ZWFlYjUzNjBiY2RiMjRkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._QxSZR-AarUGSnloFaAtYA7sSsP6qojMzXq4-1U6A0I'
        }
      }
    );

    const resData = await res.json();
    setMovie(resData)

    console.log(resData)
    setImageURL(`https://image.tmdb.org/t/p/original${resData.backdrops[6].file_path}`);
  }


  const f3 = async () => {
    console.log("called")
    const randomNumber = Math.floor(Math.random() * 500 + 100);
    setNu(randomNumber)
    const res2 = await fetch(`https://api.themoviedb.org/3/movie/${nu}?language=en-US`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzBiOGJhZjE4MjUyN2Q5OTFiODM3MGMwZDRmNThkOCIsIm5iZiI6MTc0NzU0NzA0Ni4yMTgsInN1YiI6IjY4Mjk3M2E2ZWFlYjUzNjBiY2RiMjRkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._QxSZR-AarUGSnloFaAtYA7sSsP6qojMzXq4-1U6A0I'
        }
      }
    );

    const resData2 = await res2.json();
    setTitle(resData2.title)
    console.log(resData2)
    console.log(title)

  }




  return (<>

    <Navbar />
    <h1 className="text-7xl mt-10 text-center font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
      WELCOME TO FRAME.IQ
    </h1>
    <LatestMovies />

    <center>
      <button onClick={(e) => { f2(),f3() }} className="rounded h-15 text-xl mt-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black">Start the Game</button>
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