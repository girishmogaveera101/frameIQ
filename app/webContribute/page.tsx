"use client"

import react, { useState, useEffect } from 'react'
const token = process.env.NEXT_PUBLIC_TMDB_URI;
import Navbar from '../components/navbar'


interface MovieData {
    backdrops: any[];
    file_path: string;
}


export default function Home() {

    // const [movie, setMovie] = useState<MovieData | null>(null);
    const [imageURL, setImageURL] = useState<string>("")
    const [title, setTitle] = useState<string>("-");
    const [director, setDirector] = useState<string>("");
    const [releaseDate, setReleaseDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [username, setUsername] = useState<string>("admin");








    const handleClick = async () => {
        if (title == "-") {
            alert("Empty Data")
            return;
        }
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
                    description: description,
                    releaseDate: releaseDate,
                    director: director,
                    username: username

                }
            )
        })
        const resstatus = await response.json();
        console.log(resstatus);
    }


    // useEffect(()=>{
    //     f2();
    // },[ran])

    const f2 = async () => {
        const randomNumber = Math.floor(Math.random() * 50000);
        // alert(username)



        try {
            const imageRes = await fetch(`https://api.themoviedb.org/3/movie/${randomNumber}/images`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            // const infoRes = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=release_date.desc&page=2&release_date.gte=2000-01-01&release_date.lte=2024-05-01&vote_count.gte=5000&with_original_language=en`, {

                const infoRes = await fetch(`https://api.themoviedb.org/3/movie/${randomNumber}?language=en-US`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const imageData = await imageRes.json();
            const infoData = await infoRes.json();

            const backdrop = imageData.backdrops?.[14] || imageData.backdrops?.[13] || imageData.backdrops?.[12] || imageData.backdrops?.[9] || imageData.backdrops?.[4] || imageData.backdrops?.[0];

            if (!backdrop) {
                console.warn(`No backdrop found for ID: ${randomNumber}. Retrying...`);
                f2();
                return;
            }

            setImageURL(`https://image.tmdb.org/t/p/original${backdrop.file_path}`);
            // setMovie(imageData);
            setTitle(infoData.title);
            setReleaseDate(infoData.release_date)
            // setDirector(infoData.director)
            setDescription(infoData.overview)
            setRating(infoData.vote_average)

            console.log("Image Data", imageData);
            console.log("Info : ", infoData);
            console.log("Title : ", infoData.title);
            console.log("Release Date : ", infoData.release_date);
            console.log("Description : ", infoData.overview);
            console.log("Budget : ", infoData.budget);
            console.log("IMDB Rating : ", infoData.vote_average);

        } catch (err) {
            console.error("Something exploded 💥:", err);
            f2();
        }
    }







    return (<>

        <Navbar />

        <center>
            <button onClick={(e) => { f2() }} className="rounded h-15 text-xl mt-20 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black">Next Frame</button>
        </center>
        <div className='md: w-[100%] border-black'>
            {imageURL && (
                <div className=" flex flex-col items-center w-full mt-5">
                    <img src={imageURL} className='md:h-70 h-40' alt="Movie Poster" />
                    <p className="text-black text-xl">{title}</p>
                </div>
            )}

        </div>
        <div className="text-black flex flex-col items-center justify-center">
            <p className="">{title}</p>
            <p className="">{imageURL}</p>
            <p className="">{releaseDate}</p>
            <p className="">{description}</p>
            <p className="">{rating}</p>
        </div>
        <center>
            <button onClick={handleClick} className="rounded h-15 text-xl mt-20 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black">Upload to Database</button>
        </center>

    </>
    );
}