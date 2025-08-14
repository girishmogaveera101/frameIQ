"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import TextLogoImage from '../../public/images/logo/logoForNav.png'

interface movieType {
    _id: number,
    title: string,
    imageURL?: string,
    rating?: number
}

export default function navbar() {

    const router = useRouter();

    const [username, setUsername] = useState<string | null>(null);
    // console.log("username : ", username)

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
        // console.log(resData);
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
                <div className="md:w-[40%] w-full">
                    <img className='md:w-50 w-40 md:ml-30 ml-10 ' src="/images/logo/logoForNav.png" alt="Website Logo" />
                </div>
                <div className=' w-[60%] align-right  md:flex justify-evenly hidden'>
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
                        <div className="flex flex-col border-0 md:w-[60%]">
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
                        <input type='submit' onClick={() => {
                            if (movieTitle != "") {
                                router.push(`/movie/${movieTitle}`)
                            }
                            else {
                                alert("Enter a movie title")
                            }
                        }
                        }
                            className='bg-purple-400 hidden md:flex font-bold text-sxl rounded text-black  w-25
                        hover:bg-blue-600 hover:text-white transition-all duration-700 hover:border-black'
                            value="search" />

                    </div>
                </div>
                <div className="group md:hidden">
                    {menuOpen ?
                        (
                            <X size={36} onClick={() => setMenuOpen(!menuOpen)}
                                className="menuIcon  text-purple-400 m-5 cursor-pointer" />
                        ) : (
                            <Menu size={36} onClick={() => setMenuOpen(!menuOpen)}
                                className="menuIcon  text-purple-400 m-5 cursor-pointer" />
                        )
                    }

                </div>
            </div >
            <div className={`text-white border-b-1  border-purple-900 bg-black fixed w-full transition-all duration-500 ease-in-out md:hidden text-center group-hover:text-black
                 ${menuOpen ? "top-[8%]" : "-top-[20%]"}`}>
                <Link href={`/`} onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-7 mt-10 transition-all duration-200 hover:text-purple-400">Home</p>
                </Link>
                <Link href='/game' onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-7 transition-all duration-200 hover:text-purple-400">Game</p>
                </Link>
                <Link href='/contribute' onClick={() => { setMenuOpen(!menuOpen) }}>
                    <p className="text-xl text-gray-400 m-7 transition-all duration-200 hover:text-purple-400">Contribute</p>
                </Link>
                {username ? (
                    <Link href={`/user/${username}`} onClick={() => { setMenuOpen(!menuOpen) }}>
                        <p className="text-xl text-gray-400 m-7 mb-6 transition-all duration-200 hover:text-purple-400">Profile</p>
                    </Link>
                ) : (
                    <Link href='/signup' onClick={() => { setMenuOpen(!menuOpen) }}>
                        <p className="text-xl text-gray-400 m-7 mb-10 transition-all duration-200 hover:text-purple-400">signup</p>
                    </Link>
                )}
            </div>
        </div>
    )
}