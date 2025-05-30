"use client"

import React, { useState, useEffect } from 'react'

interface DataType {
  _id: string;
  title: string;
  imageURL: string;
  rating: number;
  director: string;
  username: string;
  releaseDate: string;
}

export default function latestMovies() {


  const [latestMovies, setLatestMovies] = useState<DataType[]>([]);

  const f1 = async () => {
    try {
      const response = await fetch('/api/latestMovies');
      const resData = await response.json();
      setLatestMovies(resData);
      console.log(resData)
      // console.log("ll : ",latestMovies)
    } catch (err) {
      console.error("Brooo something broke 🤕", err);
    }
  };

  useEffect(() => {
    f1();
  }, []);


  return (
    <div className=''>
      <p className='text-[rgb(190,190,190)] mt-10 md:mt-0 text-xl md:text-xl text-center md:text-left font-bold md:ml-20 '>Latest contributes</p>
      <div className="mt-5 w-[100%] ml-[0%] md:h-130 h-75  bg-[rgb(0,0,0)] flex overflow-x-auto overflow-hidden items-center space-x-4 p-4">
        <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        <div className='flex flew-row hover:'
          style={{
            animation: "scroll-left 150s linear infinite",
          }}>
          {latestMovies.length - 1 > 0 ? (
            latestMovies.map((movie, index) => (
              <div
                key={index}
                className="group card md:h-100 min-w-[400] md:m-5 mx-3 md:min-w-[600px] h-[250px] flex flex-col p-4 justify-end items-start overflow-hidden rounded-xl relative"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-120"
                  style={{
                    backgroundImage: `url(${movie.imageURL})`,
                  }}
                />

                <div className='flex flex-row'>
                  <div className="relative  z-10 text-white">
                    <p className="font-bold text-3xl md:text-6xl ">
                      {movie.title.slice(0, 25)}{movie.title.length > 25 && "..."}
                    </p>
                  </div>

                </div>
                <div className='flex flex-row'>
                  <div className="relative  z-10 text-white">
                    <p className="md:text-2xl text-xs">rating: {movie.rating ? movie.rating.toFixed(1) : "NaN"}/10</p>
                    <p className="md:text-2xl text-xs">{movie.releaseDate ? movie.releaseDate.slice(0, 4) : "  -"}</p>

                  </div>
                  <div className="relative w-45 z-10 md:w-95 items-end text-white flex flex-col justify-end">
                    <p className="text-white md:text-1xl text-xs">{movie.username ? `@${movie.username}` : "@admin"}</p>
                  </div>
                </div>
              </div>

            ))

          ) : (
            <p className='text-purple-300 text-2xl text-center font-extrabold'>loading..</p>
          )}
        </div>
      </div>
    </div>
  )
}

