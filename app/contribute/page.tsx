"use client"

import React, { useState } from "react";
const token = process.env.NEXT_PUBLIC_TMDB_URI;

interface MovieType {
    id?: number;
    title?: string;
    imageURL?: string;
}

function page() {

    const [movieData, setMovieData] = useState<MovieType>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [idNumber, setidNumber] = useState<number>();
    const [idArray, setidArray] = useState<number[]>([]);
    const [imgURLS, setImgURLS] = useState<string[]>([]);

    const getid = async () => {
        setidArray([]);
        const response = await fetch("/api/findid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pageNumber }),
        });
        const resData = await response.json();
        for (let i = 0; i < 20; i++) {
            setidArray((prev) => [...prev, resData[i].id]);
        }
    }


    const getMovieData = async () => {
        if (!idNumber) {
            alert("ID is null")
            return;
        }
        const infoRes = await fetch("/api/findMovieData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idNumber }),
        });


        const imageRes = await fetch("/api/findImages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idNumber }),
        });

        const infoData = await infoRes.json();
        setMovieData({ title: infoData.title, id: infoData.id })
        const imageData = await imageRes.json();
        for (let i = 0; i < 50; i++) {
            setImgURLS((prev) => [...prev, imageData.backdrops[i].file_path])
        }
    }

    return (
        <>
            <center>
                <div className="fixed w-full bg-[rgb(234,0,255)] p-3 top-0 flex flex-row pt-5 flex-wrap md:justify-evenly justify-center items-center">
                    <p className="text-black font-extrabold text-xl mr-5">Page Number</p>
                    <input
                        className="border-black font-extrabold border-2 w-[15%] text-black"
                        type="number"
                        value={pageNumber}
                        onChange={(e) => {
                            setPageNumber(e.target.valueAsNumber);
                        }}
                    />
                    <br />
                    <button onClick={getid}
                        className="rounded h-13 text-xl mt-10 mb-10 hover:bg-purple-800 font-bold transition-all duration-300 w-60 bg-black text-white">
                        Get IDs for page {pageNumber}
                    </button>





                    <input
                        className="border-black border-2 font-extrabold rounded h-15 text-xl  text-black"
                        type="number"
                        value={idNumber}
                        onChange={(e) => {
                            setidNumber(e.target.valueAsNumber);
                        }}
                    />
                    <button onClick={getMovieData}
                        className="rounded h-15 text-xl hover:bg-purple-800 font-bold transition-all duration-300 w-30 bg-black text-white">
                        Get Data
                    </button>
                    <div className="flex w-full mt-5 md:h-60 h-40 bg-black p-2 items-center justify-center text-white flex-row flex-wrap">
                        <img className="w-[50%] md:w-[20%]" src={`https://image.tmdb.org/t/p/original${movieData?.imageURL}`} alt="" />
                        <div className="flex flex-col w-[50%]">
                            <p className="text-white">{movieData?.title}</p>
                            <p className="text-white text-2xl">{movieData?.id}</p>
                        </div>
                    </div>
                </div>

                <div className="flex bg-black mt-110 md:mt-120 items-center justify-center text-white flex-row flex-wrap">
                    {idArray.map((id, index) => (
                        <p key={index} onClick={(e) => { setidNumber(id) }} className=" border md:text-xl text-xs px-2 my-2 mx-3">{id}</p>
                    ))}
                </div>

                <div className="flex flex-row mt-3 bg-black flex-wrap">
                    {imgURLS.map((img, index) => (
                        <div key={index} className="flex flex-row justify-center w-1/2 flex-wrap md:w-1/4">
                            <p className="text-white">{index}</p>
                            <img onClick={() => { setMovieData((prev) => ({ ...prev, imageURL: `https://image.tmdb.org/t/p/original${img}` })) }} key={index} src={`https://image.tmdb.org/t/p/original${img}`} alt="" className=" w-[90%] m-5 h-auto" />
                        </div>
                    ))}
                </div>


            </center>
        </>
    )
}

export default page