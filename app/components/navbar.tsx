"use client"

import React, { useState } from 'react'

export default function navbar() {



    const [songName, setSongName] = useState("");

    const searchSong = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Song name : ", songName)

        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songName)}&limit=1`);
        // interface resData{
        //     results : 
        // }
        const resData = (await response).json();
        console.log(resData);
        // console.log(resData)

    }
    return (
        <div className='w-full text-white h-16 flex md:flex-row items-center bg-purple-800 '>
            <p className='w-[60%] ml-30 font-bold text-2xl pl-3 pr-10'>FrameFlix</p>
            <div className=' w-[40%] align-right  flex justify-evenly'>
                <p className='font-bold'>login</p>
                <p className='font-bold'>contribute</p>
                <div>
                    <form onSubmit={searchSong}>
                        <input type="text" className="border text-white pl-3 mr-2" value={songName} onChange={(e) => { setSongName(e.target.value) }} placeholder='Search a movie' />
                        <input type='submit' className='bg-white text-sxl rounded text-purple-700  w-25' value="submit" />
                    </form>
                </div>
            </div>
        </div >
    )
}