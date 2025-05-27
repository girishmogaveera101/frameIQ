"use client"

import React, { useEffect, useState } from "react";
import Loading from '../components/loading'
import Navbar from '../components/navbar'


interface MovieType {
    key?: number;
    title?: string;
    imageURL?: string;
    rating?: number;
    description?: string;
    releaseDate?: string;
    director?: string;
    username?: string;
}

interface IDItem {
    id: number;
    title: string;
}


function page() {

    const [loadingStatus, setLoadingStatus] = useState<boolean>(true);


    const [username, setUsername] = useState<string>("admin");
    const [director, setDirector] = useState<string>("-")


    const randomPage = async () => {
        const randomNumber = await Math.floor(Math.random() * 47);
        setPageNumber(randomNumber)
    }

    const [movieData, setMovieData] = useState<MovieType>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [idNumber, setidNumber] = useState<number>(533535);
    const [idArray, setidArray] = useState<number[]>([]);
    const [movieName, setMovieName] = useState<string[]>([]);
    const [imgURLS, setImgURLS] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setLoadingStatus(false)
        }, 4000);
        getid();
        getMovieData();

    }, [])

    const getid = async () => {


        setidArray([]);
        const response = await fetch("/api/findid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pageNumber }),
        });
        const resData = await response.json() as { id: number; title: string }[];
        console.log(resData)
        const newIds = resData.map((item) => item.id);
        const newTitles = resData.map((item) => item.title);

        setidArray(newIds);
        setMovieName(newTitles);
    }


    const getMovieData = async () => {
        if (!idNumber) {
            alert("ID is null")
            return;
        }
        setImgURLS([]);
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
        console.log(infoData)
        setMovieData(
            {
                key: infoData.id,
                title: infoData.title,
                rating: infoData.vote_average,
                description: infoData.overview,
                releaseDate: infoData.release_date,
                director: director,
                username: username
            })
        const imageData = await imageRes.json();
        if (!imageData) {
            alert("Error");
            return;
        }
        for (let i = 0; i < imageData.length; i++) {
            setImgURLS((prev) => [...prev, imageData[i].file_path])
        }
    }

    const uploadMovieData = async () => {
        if (movieData?.imageURL == undefined) {
            alert("Error")
            return;
        }
        const response = await fetch('/api/contributeMovie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
        })
        const resData = await response.json();
        console.log(movieData)
        console.log(resData)
        alert("Inserted to database")

    }

    return (
        <>

            {loadingStatus && <Loading />}
<Navbar/>

            {/* <center> */}
            <div className="border-black border-2 md:h-full md:w-full w-full bg-[rgb(251,207,255)] pt-20 flex flex-row flex-wrap md:justify-evenly md:items-left justify-start items-center">
                <div className="md:w-[25%]  w-[70%] flex flex-row flex-wrap justify-end items-center">
                    <button onClick={randomPage}
                        className="rounded  m-3 md:h-20 h-10 md:text-xl text-xs hover:bg-purple-800 font-bold transition-all duration-300 md:w-30 w-18 bg-black text-white">
                        new page
                    </button>

                    <button onClick={getid}
                        className="rounded  m-3 md:px-0 md:h-20 h-10 md:text-xl text-xs hover:bg-purple-800 font-bold transition-all duration-300 md:w-70 w-38 bg-blue-500 text-white">
                        Get IDs for Page{pageNumber}
                    </button>

                    <button onClick={uploadMovieData}
                        className="rounded  m-3 md:h-20 h-10 md:text-xl text-xs hover:bg-black font-bold transition-all duration-300 md:w-70 w-38 bg-green-700 text-white">
                        Upload Movie Data
                    </button>
                    <button onClick={getMovieData}
                        className="rounded  m-3  md:px-0 md:h-20 h-10 md:text-xl text-xs hover:bg-purple-800 font-bold transition-all duration-300 md:w-30 w-18 bg-black text-white">
                        Get Data
                    </button>
                </div>




                <div className=" md:h-full md:w-[15%] w-[30%] h-full flex flex-col md:justify-start md:items-start justify-center items-center">
                    <input className=" bg-purple-800 md:w-[50%] w-[50%] text-center md:h-40 h-20 font-extrabold rounded text-5xl  text-white"
                        type="number"
                        value={pageNumber}
                        onChange={(e) => {
                            setPageNumber(e.target.valueAsNumber);
                        }}
                    />
                    <input className=" md:w-[200%] w-[50%] h-5 font-extrabold rounded md:text-3xl md:mt-4  text-purple-900"
                        type="number"
                        value={idNumber}
                        onChange={(e) => {
                            setidNumber(e.target.valueAsNumber);
                        }}
                    />
                </div>







                <div className="flex md:w-[50%] w-full m-5 md:h-90 h-40 bg-black rounded-2xl p-2 items-center justify-center text-white flex-row flex-wrap">
                    <img className="rounded-xl font-extrabold ml-[2%] w-[50%] md:w-[50%]"
                        src={`https://image.tmdb.org/t/p/original${movieData?.imageURL}`} alt="Select an image " />
                    <div className="flex md:ml-20 ml-5 md:pt-[5%] md:h-full flex-col w-[30%] items-start">
                        <p className="text-white font-extrabold md:mb-5 text-xl md:text-4xl">{movieData?.title}</p>
                        <p className="text-white font-extrabold md:ml-5 text-xs md:text-xl">rating : {movieData?.rating?.toFixed(1)}</p>
                        <p className="text-white font-extrabold md:ml-5 text-xs md:text-xl">{movieData?.releaseDate?.slice(0, 4)}</p>

                    </div>
                </div>
            </div>

            <div className="flex bg-black md:mt-0 py-2 items-center justify-center text-white flex-row flex-wrap">
                {idArray.map((id, index) => (
                    <div key={index} onClick={(e) => { setidNumber(id), getMovieData() }}
                        className="border-[rgb(122,122,122)] active:bg-purple-400 hover:bg-purple-400 transition-all duration-300 hover:text-black border-1 md:p-5 md:mx-8 m-2 cursor-pointer">
                        <p key={index} className="m-1 font-extrabold md:text-xl text-xs">{movieName[index].slice(0, 20)}</p>
                    </div>

                ))}
            </div>

            <div className="flex flex-row  bg-black flex-wrap">
                {imgURLS.map((img, index) => (
                    <div key={index} className="flex flex-row justify-center w-1/2 flex-wrap md:w-1/4">
                        {/* <p className="text-white">{index}</p> */}
                        <img onClick={(e) => { setMovieData((prev) => ({ ...prev, imageURL: `https://image.tmdb.org/t/p/original${img}` })) }}
                            key={index} src={`https://image.tmdb.org/t/p/original${img}`}
                            alt="" className=" w-[90%] m-5 h-auto transition-all duration-300 cursor-pointer hover:scale-110" />
                    </div>
                ))}
            </div>


            {/* </center> */}
        </>
    )
}

export default page