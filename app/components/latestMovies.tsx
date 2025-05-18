"use client"

import React, { useState, useEffect } from 'react'

interface DataType {
    _id: string;
    title: string;
    imageURL: string;
    rating:number;
    director:string;
}
export default function latestMovies() {



    const [latestMovies, setLatestMovies] = useState<DataType[]>([]);


    const f1 = async () => {
        try {
            const response = await fetch('/api/latestMovies'); 
            const resData = await response.json();
            setLatestMovies(resData.reverse());
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
        <>
            <p className='text-[rgb(80,80,80)] mt-10 text-2xl text-center md:text-left font-bold md:ml-50 '>Latest contributes</p>
            <div className="mt-5 w-[100%] ml-[0%] h-80  bg-[rgb(0,0,0)] flex overflow-x-auto overflow-y-hidden items-center space-x-4 p-4">
                {latestMovies.length - 1 > 0 ? (
                    latestMovies.map((movie, index) => (
                        <div
                        key={index}
                        className="group card min-w-[400px] h-[270px] flex flex-col p-4 justify-end items-start overflow-hidden rounded-xl relative"
                      >
                        {/* Background Image Layer */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-120"
                          style={{
                            backgroundImage: `url(${movie.imageURL})`,
                          }}
                        />
                      
                        {/* Overlay for content */}
                        <div className="relative z-10 text-white">
                          <p className="font-bold text-4xl ">
                            {movie.title}
                          </p>
                          <p className="text-xl">rating: {movie.rating? movie.rating:7.5}/10</p>
                        </div>
                      </div>
                      
                    ))
                ) : (
                    <p>loading</p>
                )}
            </div>
        </>
    )
}

