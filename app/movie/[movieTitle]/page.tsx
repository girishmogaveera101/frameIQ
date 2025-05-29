"use client"

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'

// movie data interface
interface movieType {
  _id?: number;
  description?: string;
  director?: string;
  imageURL?: string;
  key?: number;
  rating?: number;
  releaseDate?: string;
  title?: string;
  username?: string;
}


export default function ProductPage() {
  // query params 
  const params = useParams();
  const rawTitle = params.movieTitle as string;
  const movieTitle = decodeURIComponent(rawTitle);

  // movie object
  const [movieData, setMovieData] = useState<movieType>();



  useEffect(() => {
    if (!movieTitle) return;
    const findMovie = async () => {
      const response = await fetch('/api/findMoviedataFromTitle', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: movieTitle }),
      });
      const resData = await response.json();
      setMovieData(resData.findMovie);
    }
    findMovie();
    console.log(movieTitle)
  }, [movieTitle]);



  return (
    <>
      <Navbar />
      <div className="flex flex-row md:mt-20 border-0 justify-end">
        <div className="mt-10 border-0 md:w-[40%] flex flex-col text-white pl-30 pb-30 space-y-15 text-3xl">
          <p className="text-7xl font-extrabold text-blue-400">{movieData?.title}</p>
          <p className="text-xl font-extrabold text-purple-200">{movieData?.description}</p>
          <p className="text-2xl font-extrabold text-purple-200">released :  {movieData?.releaseDate}</p>
          <p className="text-2xl font-extrabold text-purple-200">IMDB Rating :  {movieData?.rating?.toFixed(1)}</p>
          <p className="text-2xl font-extrabold text-purple-200">Contributer :  @{movieData?.username}</p>
        </div>
        <div className="w-[60%] border-0 overflow-hidden flex justify-center items-start mt-40">
          {/* <div className="h-[150px"> */}
            <img src={`${movieData?.imageURL}`}
              className='border-0 w-[70%]'
              alt="movie screenshot" />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
