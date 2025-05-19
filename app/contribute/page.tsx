"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'

export default function page() {

    // variables
    const [title, setTitle] = useState<string>("")
    const [imageURL, setImageURL] = useState<string>("")
    const [director, setDirector] = useState<string>("");
    const [releaseDate, setReleaseDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number>(0)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/contributeMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    title: title,
                    imageURL: imageURL,
                    rating: rating,
                    description:description,
                    releaseDate:releaseDate,
                    director:director

                }
            )
        });
        const resData = await response.json();
        console.log(resData);

    }

    return (
        <>
            <Navbar />
            <p className="text-3xl text-black font-bold ml-[5%] mt-20">Contribute to our app</p>
            <div className='text-[rgb(255,255,255)] w-[90%] md:w-[35%] mt-5 ml-[5%] rounded-xl
             bg-[rgb(12,3,36)]  pt-3 px-10 md:px-20'>
                <p className="text-center text-2xl text-[rgb(224,219,255)]">Enter Movie details</p>
                <form onSubmit={handleSubmit}>
                    <div className='  w-[100%] flex flex-col items-start'>
                        <p className="text-xl mt-4">Enter movie title</p>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}
                            className='border font-bold w-[50%] h-10 pl-4 mt-2 md:w-[30%]'
                            placeholder='Iron Man 2' required />
                        <p className="text-xl mt-7">Paste the movie frame link address</p>
                        <input type="url" value={imageURL} onChange={(e) => { setImageURL(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2 w-full  md:w-[100%]'
                            placeholder='https://film-grab.com/wp-content/upl' required />
                        <p className="text-xl mt-7">Rating</p>
                        <input type="number" value={rating} onChange={(e) => { setRating(e.target.valueAsNumber) }}
                            className='border font-bold h-10 mt-2 pl-4 md:w-[15%]'
                            placeholder='8.6' required />
                        <p className="text-xl mt-4">Description [optional]</p>
                        <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2 md:w-[50%]'
                            placeholder='Tony Stark is under pressure from various sources'/>
                        <p className="text-xl mt-4">Release Date [optional]</p>
                        <input type="text" value={releaseDate} onChange={(e) => { setReleaseDate(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2 md:w-[50%]'
                            placeholder='7 May 2010' required />
                        <p className="text-xl mt-4">Director [optional]</p>
                        <input type="text" value={director} onChange={(e) => { setDirector(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2 md:w-[50%]'
                            placeholder='Jon Favreau' required />
                        <button type='submit' className=' w-[50%] md:w-[20%] mb-10 text-black h-10 bg-white mt-5 font-bold transition-all duration-500 hover:bg-[rgb(117,227,255)] hover:text-black'>submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

