"use client"

import React, { useState } from "react";
const token = process.env.NEXT_PUBLIC_TMDB_URI;

interface MovieType {
    id: number;
    title: string;
    imageURL: string;
}

function page() {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [idNumber, setidNumber] = useState<number>();
    const [idArray, setidArray] = useState<number[]>([]);
    const [imgURLS, setImgURLS] = useState<string[]>([]);
    // const idArray: number[] = [];

    const getid = async () => {
        setidArray([]);
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=release_date.desc&page=${pageNumber}&release_date.gte=2000-01-01&release_date.lte=2025-05-01&vote_count.gte=5000&with_original_language=en`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resData = await response.json();
        // console.log(resData)
        for (let i = 0; i < 20; i++) {
            setidArray((prev) => [...prev, resData.results[i].id]);
        }
    }


    const getMovieData = async () => {
        const infoRes = await fetch(
            `https://api.themoviedb.org/3/movie/${idNumber}?language=en-US`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const imageRes = await fetch(
            `https://api.themoviedb.org/3/movie/${idNumber}/images`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const infoData = await infoRes.json();
        const imageData = await imageRes.json();
        console.log(imageData.backdrops)
        for (let i = 0; i < 50; i++) {
            setImgURLS((prev) => [...prev, imageData.backdrops[i].file_path])
        }
    }

    return (
        <>
            <center>
               <div className="flex flex-row flex-wrap">
               <p className="text-black mt-20">Enter the Page Number</p>
                <input
                    className="border-black border-2 text-black"
                    type="number"
                    value={pageNumber}
                    onChange={(e) => {
                        setPageNumber(e.target.valueAsNumber);
                    }}
                />
                <br />
                <button onClick={getid}
                    className="rounded h-13 text-xl mt-10 mb-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black text-white">
                    Get IDs for page {pageNumber}
                </button>





                <input
                    className="border-black border-2 rounded h-15 text-xl  text-black"
                    type="number"
                    value={idNumber}
                    onChange={(e) => {
                        setidNumber(e.target.valueAsNumber);
                    }}
                />
                <button onClick={getMovieData}
                    className="rounded h-15 text-xl mt-10 mb-10 hover:bg-purple-800 font-bold transition-all duration-300 w-30 bg-black text-white">
                    Get Data
                </button>
               </div>

               <div className="flex bg-black items-center justify-center h-50 text-white flex-row flex-wrap">
                    {idArray.map((id, index) => (
                        <p key={index} className=" border px-2 my-2 mx-3">{id}</p>
                    ))}
                </div>

                <div className="flex flex-row bg-black flex-wrap">
                    {imgURLS.map((img, index) => (
                        <div key={index} className="flex flex-row justify-center flex-wrap w-1/4">
                            <p key={index} className="text-white">{index}</p>
                            < img key={index} src={`https://image.tmdb.org/t/p/original${img}`} alt="" className=" w-[90%] m-5 h-auto" />
                        </div>
                    ))}
                </div>


            </center>
        </>
    )
}

export default page