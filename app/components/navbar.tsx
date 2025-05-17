"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

interface movieType {
    _id: number,
    title: string,
    imageURL?: string,
    rating?: number
}

export default function navbar() {



    const [movieTitle, setMovieTitle] = useState<string>("");
    const [movies, setMovies] = useState<movieType[]>([]);

    const searchMovie = async (title: string) => {
        const response = await fetch("/api/allMovies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title }),
        });
        const resData = await response.json();
        console.log(resData);
        setMovies(resData.existingMovie);

    }
    useEffect(() => {
        if (movieTitle.trim().length > 0) {
            searchMovie(movieTitle);
        } else {
            setMovies([]);
        }
    }, [movieTitle])


    return (
        <div className='w-full text-white h-16 flex md:flex-row items-center bg-purple-800 '>
            <p className='w-[60%] ml-30 font-bold text-2xl pl-3 pr-10'>Frame.IQ</p>
            <div className=' w-[40%] align-right  flex justify-evenly'>
                <Link href='/'>
                    <p className='font-bold'>Home</p>
                </Link>
                <p className='font-bold'>login</p>
                <Link href="/contribute">
                    <p className='font-bold'>contribute</p>
                </Link>
                <div className='flex'>
                    <div className="flex flex-col">
                        <input type="text" className="border font-bold outline-1 text-white pl-3 mr-2"
                            value={movieTitle ?? ""}
                            onChange={(e) => {
                                const val = e.target.value;
                                setMovieTitle(e.target.value);
                            }}
                            placeholder='Search a movie' />
                        <div className="absolute mt-8  bg-black w-58">
                            {movies.map((movie,index)=>(
                                <p className='text-[rgb(217,160,255)] border-1 bg-red m-2'  key={index} onClick={()=>{setMovieTitle(movie.title)}}>{movie.title}</p>
                            ))}
                        </div>
                    </div>
                    <input type='submit' className='bg-white font-bold text-sxl rounded text-purple-700  w-25
                        hover:bg-black hover:text-white transition-all duration-700 hover:border-black border-2' value="Find?" />
                </div>
            </div>
            <div>

            </div>
        </div >
    )
}