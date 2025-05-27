"use client"

import React, { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import Link from 'next/link';
import Cookies from 'js-cookie';

interface movieType {
    _id: number,
    title: string,
    imageURL?: string,
    rating?: number
}

export default function navbar() {

    const [username, setUsername] = useState<string | null>(null);
    console.log("username : ", username)

    useEffect(() => {
        const user = Cookies.get('username');
        setUsername(user ?? null)
    }, [])


    const [movieTitle, setMovieTitle] = useState<string>("");
    const [movies, setMovies] = useState<movieType[]>([]);
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

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
        <div className="flex z-50 flex-col fixed top-0 w-full">
            <div className='w-full z-10  text-white h-20 flex md:flex-row items-center bg-black border-b-1 border-b-gray-800'>
                <p className='md:w-[60%] w-full bg-gradient-to-r from-purple-400 via-blue-500 bg-clip-text text-transparent md:ml-30 ml-10 text-left md:text-left font-bold md:text-3xl text-2xl md:pl-3 md:pr-10'>
                    Frameiq
                </p>
                <div className=' w-[40%] align-right  md:flex justify-evenly hidden'>
                    <Link href='/'>
                        <p className='font-bold hover:text-blue-400 transition-all duration-200'>Home</p>
                    </Link>

                    {username ? (
                        <Link href={`/user/${username}`}>
                            <p className='font-bold hover:text-blue-400  transition-all duration-200'>profile</p>
                        </Link>
                    ) : (
                        <Link href='signup'>
                            <p className='font-bold hover:text-blue-400 transition-all duration-200'>signup</p>
                        </Link>)
                    }

                    <Link href="/contribute">
                        <p className='font-bold hover:text-blue-400  transition-all duration-200'>contribute</p>
                    </Link>
                    <div className='flex'>
                        <div className="flex flex-col">
                            <input type="text" className="border-l-1 border-purple-500 font-bold outline-0 text-white pl-3 mr-2 cursor-pointer"
                                value={movieTitle ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setMovieTitle(e.target.value);
                                }}
                                placeholder='Search a movie' />
                            <div className="absolute mt-8  bg-black w-58 cursor-pointer" >
                                {movies.map((movie, index) => (
                                    <p className='text-[rgb(217,160,255)] border-b-0 bg-red m-2' key={index} onClick={() => { setMovieTitle(movie.title) }}>{movie.title}</p>
                                ))}
                            </div>
                        </div>
                        <input type='submit' className='bg-white hidden font-bold text-sxl rounded text-purple-700  w-25
                        hover:bg-black hover:text-white transition-all duration-700 hover:border-black border-2' value="Find?" />
                    </div>
                </div>
                <div className="group md:hidden">
                    <Menu size={36} onClick={() => setMenuOpen(!menuOpen)}
                        className="menuIcon transition-all duration-200 hover:text-purple-400 m-5 cursor-pointer" />
                </div>
            </div >
            <div className={`text-white border-b-1  border-purple-900 bg-black transition-all duration-500 overflow-hiddenmd:hidden text-center overflow-hidden group-hover:text-black md:p-5
                 ${menuOpen ? "flex flex-col" : "hidden"}`}>
                <Link href={`/`} onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-2 mt-6 transition-all duration-200 hover:text-purple-400">Home</p>
                </Link>
                <Link href='/game' onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-2 transition-all duration-200 hover:text-purple-400">Game</p>
                </Link>
                <Link href='/contribute' onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-2 transition-all duration-200 hover:text-purple-400">Contribute</p>
                </Link>

                {username ? (
                    <Link href={`/user/${username}`} onClick={() => { setMenuOpen(!menuOpen) }}>
                        <p className="text-xl text-gray-400 m-2 mb-6 transition-all duration-200 hover:text-purple-400">Profile</p>
                    </Link>
                ) : (
                    <Link href='/signup' onClick={() => { setMenuOpen(!menuOpen) }}>
                        <p className="text-xl text-gray-400 m-2 mb-6 transition-all duration-200 hover:text-purple-400">signup</p>
                    </Link>
                )}

            </div>
        </div>
    )
}