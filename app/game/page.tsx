"use client"

import react, { useState, useEffect } from 'react'

interface movieType {
    _id: number,
    title: string,
    imageURL?: string,
    rating?: number
}

interface movieDataType {
    _id: string;
    description: string;
    director: string;
    imageURL: string;
    key: number;
    rating: string;
    releaseDate: string;
    title: string;
    username: string;
}

export default function Home() {

    const [movie, setMovie] = useState<movieDataType | null>(null);
    const [hideBarStatus, setHideBarStatus] = useState<string>("hidden");


    const handleSearch = async () => {
        const response = await fetch('/api/findOneMovie');
        const resData: movieDataType = await response.json();
        if (resData) {
            setMovie(resData);
            console.log(resData)
        }
    };


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



    const checkAnswer = async () => {
        if (movieTitle == movie?.title) {
            alert("your right");
            setMovieTitle("");
            handleSearch();
        }
        else {
            alert("Youre wrong!")
        }
    }

    useEffect(() => {
        handleSearch();
    }, [])




    return (
        <>
            <p className="text-black hidden md:flex md:text-4xl md:mt-25 mt-20 font-extrabold md:ml-25 ">One Frame. One Shot. Don’t Screw It Up.</p>
            <div className="flex md:flex-row flex-col">
                <div className="md:w-[65%] mt-20 w-[96%] shadow-2xl shadow-gray-700 rounded-[30px] md:bg-purple-700 ml-[2%] md:h-180 p-3 md:mt-5 flex flex-row">
                    <div className=" md:p-2 flex flex-col justify-center items-center w-full">
                        <div className='md:border-6 md:mt-5 border-white rounded-[30px] overflow-hidden md:w-[95%] h-[70%] md:h-[90%]'>
                            <img src={movie?.imageURL}
                                className=' text-black inset-0 h-full w-full transition-all duration-1000 hover:scale-108' alt="image" />
                        </div>
                        <div className="flex flex-row md:flex-nowrap flex-wrap h-[30%] md:h-[10%] mt-4">
                            <div className='flex'>
                                <div className="flex flex-col">
                                    <div className="absolute mt-19 ml-2 w-100  bg-black" >
                                        {movies.map((movie, index) => (
                                            <p className='text-[rgb(217,160,255)] bg-red m-3 text-xl' onClick={()=>{setHideBarStatus("hidden")}} style={{display:hideBarStatus}} key={index} onClick={() => { setMovieTitle(movie.title) }}>{movie.title}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <input type="text" value={movieTitle ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setMovieTitle(e.target.value);
                                }}
                                placeholder='Enter the Movie Title'
                                className='border-6 pl-4 border-white bg-white font-extrabold md:h-15 h-10 md:text-2xl text-xl md:w-150 m-2 text-black ' />
                            <button onClick={handleSearch}
                                className='text-white bg-black m-2 md:h-15 h-10 w-40 font-extrabold md:text-2xl text-xl transition-all duration-300 hover:bg-purple-800 rounded-[6px]'>
                                Next Frame
                            </button>
                            <button onClick={checkAnswer}
                                className='text-white bg-black m-2 md:h-15 h-10 w-30 font-extrabold md:text-2xl text-xl mb-10 transition-all duration-300 hover:bg-purple-800 rounded-[6px]'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-0 border-black md:w-[45%] w-[96%] p-2 flex flex-col justify-start items-center mt-3 md:h-full">
                    <div className="md:w-[70%] mt-5 w-full h-50 shadow-2xl shadow-gray-700 rounded-[30px] bg-purple-700 ml-[2%] md:h-120 p-3">

                    </div>
                    <div className="md:w-[70%] w-full  h-20shadow-2xl shadow-gray-700 rounded-[30px] bg-purple-700 ml-[2%] md:h-45 mt-15 p-3">

                    </div>

                </div>
            </div>
        </>
    );
}