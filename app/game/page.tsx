"use client"

import { useState, useEffect } from 'react'
import Loading from '../components/loading'
import Navbar from '../components/navbar'
import Cookies from 'js-cookie';



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

    const [username, setUsername] = useState<string | null>(null);

    const [highestRecord, setHighestRecord] = useState<number>(0);
    useEffect(() => {
        const user = Cookies.get('username');
        setUsername(user ?? null)

        const getHighestRecord = async () => {
            const response = await fetch("/api/getHighestRecord");
            const resData = await response.json();
            console.log(resData);
            setHighestRecord(resData.highrecord[0]?.record)

        }
        getHighestRecord()
    }, [])

    const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);
    const [ notifBgColor, setNotifBgColor] = useState<string>("green")
    const [ notifMsg, setNotifMsg] = useState<string>("")

    const [today, setToday] = useState('');

    useEffect(() => {
        const now = new Date();
        const formatted = now.toISOString().split('T')[0]; // e.g. "2025-06-25"
        setToday(formatted);
    }, []);
    const [movie, setMovie] = useState<movieDataType | null>(null);
    const [hideBarStatus, setHideBarStatus] = useState<string>("hidden");



    const handleSearch = async () => {
        const response = await fetch('/api/findOneMovie');
        const resData: movieDataType = await response.json();
        if (resData) {
            setMovie(resData);
            // console.log(resData)
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
        // console.log(resData);
        setMovies(resData.existingMovie);

    }

    const sendRecord = async (username: string, record: number) => {
        const response = await fetch("/api/sendRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                record: record,
                date: today
            }),
        });
        const resData = await response.json();
    }






    useEffect(() => {
        if (movieTitle.trim().length > 0) {
            searchMovie(movieTitle);
        } else {
            setMovies([]);
        }
    }, [movieTitle])










    const [attempts, setAttempts] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [totalRight, setTotalRight] = useState<number>(0);
    const [besttreak, setBestStreak] = useState<number>(0);

    const checkAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (attempts < 3) {
            if (movieTitle == movie?.title) {
                const newRight = totalRight + 1;
                const newstreak = streak + 1;

                setTotalRight(newRight)
                setShowPopup(true);
                setNotifBgColor("green")
                setNotifMsg("You are right!!")
                setMovieTitle("");
                setStreak(newstreak)
                setAttempts(0)
                if (newstreak >= besttreak) {
                    setBestStreak(newstreak)
                }
                handleSearch();
                setTimeout(() => {
                    setShowPopup(false);
                },2000); 
                return
            }
            else {
                setAttempts(attempts + 1)
                if (attempts == 2) {
                    if (besttreak > 4) {
                        sendRecord(username ? username : "guest", besttreak)
                    }
                    setShowPopup(true);
                    setNotifBgColor("red");
                    setNotifMsg("You LOST!!!")
                    setTimeout(() => {
                        setShowPopup(false);
                        window.location.reload();
                    },2000); 
                    return
                }
                setShowPopup(true);
                setNotifBgColor("red");
                setNotifMsg("You are wrong!!!")
                setTimeout(() => {
                    setShowPopup(false);
                },2000); 
                return
            }
        }
        else {
            console.log("error")
            return
        }
    }







    useEffect(() => {
        setTimeout(() => {
            setLoadingStatus(false)
        }, 2000);
        handleSearch();
    }, [])




    return (
        <div className='md:mb-20'>
            {loadingStatus && <Loading />}
            <Navbar />
            <p className="text-purple-500 text-xl text-center md:flex md:text-4xl md:mt-30 mt-25 mb-5 font-extrabold md:ml-25 ">Guess the Movie title</p>
            <div className="flex  md:flex-row mt-5 md:mt-0 flex-col justify-center items-center">
                <div className="md:w-[65%] w-[96%] border-1 md:border-0 border-purple-900  rounded-[30px] bg-transparent md:bg-black shadow-2xl shadow-black  md:bg-purple-1000 md:ml-[2%] md:h-180 p-2 pt-3 md:mt-5 flex flex-row">
                    <div className=" md:p-2 flex flex-col justify-center items-center w-full">
                        <div className='md:border-3 md:mt-5 flex border-black rounded-[30px] overflow-hidden md:w-[95%] w-[95%] h-[90%] md:h-[90%]'>
                            <img src={movie?.imageURL}
                                className=' text-black inset-0 md:h-full w-full transition-all duration-300 hover:scale-120' alt="image" />
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
                                        className='md:border-2 pl-4 md:text-blue-400 rounded-xl focus:outline-0  md:border-gray-500 w-[100%]  md:bg-black font-extrabold md:h-15 h-10 md:text-2xl text-1xl md:w-150 m-2 border-2 border-purple-700 md:mb-10  bg-black text-white ' />
                                    <button
                                        className='text-white md:border-0 border-purple-700 bg-blue-600 m-2 md:h-15 h-10 w-30 font-extrabold md:text-2xl text-xs md:mb-10 transition-all duration-300 hover:bg-green-500 rounded-[6px]'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>




                <div className="border-0 border-black md:w-[45%] w-[96%] p-2 flex flex-col justify-start items-center mt-3 md:h-full">
                    <div className=" md:w-[70%] mt-5 w-full flex flex-col md:border-2 border-1 border-gray-800 md:border-purple-700 shadow-2xl shadow-black  rounded-[30px] bg-black md:ml-[2%] md:h-110 p-3">
                        <p className="text-center text-purple-400 md:text-purple-700 md:border-b-0 md:text-4xl md:mt-3 md:pb-7 pb-3 border-[rgb(183,0,255)] text-2xl font-extrabold">Game Statistics</p>
                        <div className="flex flex-row mt-3">
                            <p className="w-[60%] text-1xl  md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Attempts</p>
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{attempts}/3</p>
                        </div>
                        <div className="flex flex-row m-2">
                            <p className="w-[60%] text-1xl  md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Current Streak</p>
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{streak}</p>
                        </div>
                        <div className="flex flex-row m-2">
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Your Record</p>
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{besttreak}</p>
                        </div>
                        <div className="flex flex-row m-2">
                            <p className="w-[60%] text-1xl md:text-2xl md:text-purple-300 md:m-4 font-extrabold text-right">Highest record</p>
                            <p className="w-[40%] text-1xl md:text-2xl md:text-purple-300 md:m-4  font-extrabold ml-5 text-left">{highestRecord}</p>
                        </div>

                    </div>
                    <div className="md:w-[70%] flex flex-col w-full mb-10 h-35 md:border-2 border-1 border-gray-800 md:border-purple-700 md:border-b-2 shadow-2xl shadow-black rounded-[30px] bg-black md:ml-[2%] md:h-35 mt-5 p-3">
                        <p className="md:text-xl md:border-b-0 border-[rgb(183,0,255)] text-center text-purple-700 md:mb-0 font-extrabold">Description</p>
                        <p className="md:text-xl md:text-purple-300 ml-10 mt-4 mb-4 md:mb-2 font-extrabold">Released : {movie?.director && movie?.releaseDate.slice(0, 4)}</p>
                        <p className="md:text-xl md:text-purple-300 ml-10 font-extrabold">Rating : {movie?.rating && movie?.rating.toFixed(1)}</p>
                    </div>

                </div>


                {showPopup && (
                    <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 bg-${notifBgColor}-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg z-50 animate-fadeIn`}>
                        {notifMsg}
                    </div>
                )}







            </div>
        </div>
    );
}