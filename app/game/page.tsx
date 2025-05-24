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
    rating: number;
    releaseDate: string;
    title: string;
    username: string;
}

export default function Home() {

    const [movie, setMovie] = useState<movieDataType | null>(null);
    const [hideBarStatus, setHideBarStatus] = useState<string>("hidden");
    const [attempts, setAttempts] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [totalAttempts, setTotalAttempts] = useState<number>(1);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [totalRight, setTotalRight] = useState<number>(0);


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



    const checkAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (attempts < 3) {
            if (movieTitle == movie?.title) {
                setAttempts(0)
                const tempAccuracy = (totalRight/totalAttempts)*100;
                setStreak(streak+1)
                // alert("your right");
                setMovieTitle("");
                setTotalRight(totalRight+1)
                console.log(totalRight)
                handleSearch();
                setTotalAttempts(totalAttempts+1);
                setAccuracy(tempAccuracy)
                return
            }
            else {
                setAttempts(attempts + 1)
                if(attempts==2){
                    setTotalAttempts(totalAttempts+1);
                    setAttempts(0)
                    setMovieTitle("")
                    setStreak(0);
                    handleSearch();
                }
                // alert("Youre wrong!");
                return
            }
        }
        else {
            console.log("error")
            return
        }
    }

    useEffect(() => {
        handleSearch();
    }, [])




    return (
        <>
            <p className="md:text-purple-900 text-xl text-purple-900 text-center md:flex md:text-4xl md:mt-25 mt-20 font-extrabold md:ml-25 ">One Frame. Three Shot. Don’t Screw It Up.</p>
            <div className="flex  md:flex-row mt-5 md:mt-0 flex-col justify-center items-center">
                <div className="md:w-[65%] w-[96%] shadow-2xl shadow-gray-700 rounded-[30px] bg-black md:bg-purple-700 md:ml-[2%] md:h-180 p-2 pt-3 md:mt-5 flex flex-row">
                    <div className=" md:p-2 flex flex-col justify-center items-center w-full">
                        <div className='md:border-6 md:mt-5 flex border-white rounded-[30px] overflow-hidden md:w-[95%] w-[95%] h-[70%] md:h-[90%]'>
                            <img src={movie?.imageURL}
                                className=' text-black inset-0 h-full w-full transition-all duration-300 hover:scale-120' alt="image" />
                            <p className="text-purple-200 text-2xl m-3 border-0 font-extrabold md:m-5 md:text-4xl border-white absolute">{movie?.releaseDate && movie?.releaseDate.slice(0, 4)}</p>
                        </div>
                        <div className=" flex flex-row md:flex-nowrap h-[30%] md:h-[10%] justify-end mt-4">
                            <div className='flex'>
                                <div className="flex flex-col">
                                    <div className="absolute md:mt-19 mt-14 ml-2  w-65 md:w-100  bg-black" >
                                        {movies.map((movie, index) => (
                                            <p className='text-[rgb(217,160,255)] bg-red m-3 md:text-xl text-xs' style={{ display: hideBarStatus }} key={index} onClick={() => { setMovieTitle(movie.title); setHideBarStatus("hidden") }}>{movie.title}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={checkAnswer}>
                                <div className="flex flex-row items-center border-0">
                                    <input type="text" value={movieTitle ?? ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setMovieTitle(e.target.value);
                                        }}
                                        placeholder='Enter Movie Title' required
                                        className='md:border-6 pl-4 md:text-black rounded-xl focus:outline-0  md:border-white w-[100%]  md:bg-white font-extrabold md:h-15 h-10 md:text-2xl text-1xl md:w-150 m-2 border-2 border-purple-700 md:mb-10  bg-black text-white ' />
                                    <button
                                        className='text-white md:border-0 border-2 border-purple-700 bg-black m-2 md:h-15 h-10 w-30 font-extrabold md:text-2xl text-xs md:mb-10 transition-all duration-300 hover:bg-green-500 rounded-[6px]'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="border-0 border-black md:w-[45%] w-[96%] p-2 flex flex-col justify-start items-center mt-3 md:h-full">
                    <div className=" md:w-[70%] mt-5 w-full h-50 flex flex-col shadow-2xl shadow-gray-700 rounded-[30px] bg-black md:ml-[2%] md:h-120 p-3">
                        <p className="text-center text-purple-200 border-b-2 md:text-3xl md:mt-3 md:pb-7 pb-3 border-[rgb(183,0,255)] text-2xl font-extrabold">Player Stats</p>
                        <div className="flex flex-row mt-3">
                            <p className="w-[40%] text-1xl  md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Current Streak</p>
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{streak}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="w-[40%]  text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Accuracy %</p>
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{accuracy}%</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Rank Level</p>
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">Guess Gladiator</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Best Streak </p>
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">13</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Total attempts</p>
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{totalAttempts}</p>
                        </div>

                    </div>
                    <div className="md:w-[70%] flex flex-col w-full mb-10 h-35 md:border-b-20 border-black shadow-2xl shadow-gray-700  rounded-[30px] bg-black md:ml-[2%] md:h-45 mt-5 p-3">
                        <p className="md:text-xl text-center text-purple-400 md:mb-2 font-extrabold">Description</p>
                        <p className="md:text-1xl ml-10 mt-2 md:mb-2 font-extrabold">Attempts : {attempts}/3</p>
                        <p className="md:text-1xl ml-10 md:mb-2 font-extrabold">Released : {movie?.director && movie?.releaseDate.slice(0, 4)}</p>
                        <p className="md:text-1xl ml-10 font-extrabold">Rating : {movie?.rating && movie?.rating.toFixed(1)}</p>
                    </div>

                </div>
            </div>
        </>
    );
}