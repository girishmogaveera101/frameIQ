"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'

export default function page() {

    // variables
    const [title, setTitle] = useState<string>("")
    const [imageURL, setImageURL] = useState<string>("")
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
                    rating: rating

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
            <div className='text-[rgb(255,255,255)] w-[90%] md:w-[45%] mt-5 ml-[5%] rounded-xl
             bg-[rgb(12,3,36)]  pt-3 px-20'>
                <p className="text-center text-2xl text-[rgb(224,219,255)]">Enter Movie details</p>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col '>
                        <p className="text-xl mt-4">Enter movie title</p>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2 md:w-[50%]'
                            placeholder='Iron Man 2' required />
                        <p className="text-xl mt-7">Paste the movie frame link address</p>
                        <input type="url" value={imageURL} onChange={(e) => { setImageURL(e.target.value) }}
                            className='border font-bold h-10 pl-4 mt-2'
                            placeholder='https://film-grab.com/wp-content/upl' required />
                        <p className="text-xl mt-7">Enter the movie rating</p>
                        <input type="number" value={rating} onChange={(e) => { setRating(e.target.valueAsNumber) }}
                            className='border font-bold h-10 mt-2 pl-4 md:w-[15%]'
                            placeholder='8.6' required />
                        <button type='submit' className=' w-[50%] md:w-[20%] mb-10 text-black h-10 bg-white mt-5 font-bold transition-all duration-500 hover:bg-[rgb(117,227,255)] hover:text-black'>submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

