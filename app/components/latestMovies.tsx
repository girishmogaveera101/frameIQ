"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';

interface DataType {
    _id: string;
    title: string;
    imageURL: string;
}
export default function latestMovies() {



    const [latestMovies, setLatestMovies] = useState<DataType[]>([]);


    const f1 = async () => {
        try {
            const response = await fetch('/api/latestMovies'); // this hits the backend
            const resData = await response.json();
            setLatestMovies(resData.reverse());
            console.log(resData)
        } catch (err) {
            console.error("Brooo something broke 🤕", err);
        }
    };

    useEffect(() => {
        f1(); // fetch on load automatically like a good boi
    }, []);


    return (
        <>
            <p className='text-[rgb(80,80,80)] mt-20 text-2xl font-bold ml-50 '>Latest top Movies</p>
            <div className="mt-5 w-[80%] ml-[10%] h-70 rounded-xl bg-purple-300 flex overflow-x-auto overflow-y-hidden items-center space-x-4 p-4">
                {latestMovies.length - 1 > 0 ? (
                    latestMovies.map((movie, index) => (
                        <div style={{
                            backgroundImage: `url(${movie.imageURL})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                            key={index} className="min-w-[400px] h-[270px] flex hover:opa flex-col p-4 justify-end items-start hover:opacity-80 transition-opacity duration-300 bg-purple-700 rounded-xl">
                            <p className="font-bold text-4xl">{movie.title}</p>
                            <p className=" text-xl">rating : 8/10</p>
                        </div>
                    ))
                ) : (
                    <p>loading</p>
                )}
            </div>
        </>
    )
}

