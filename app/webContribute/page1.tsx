"use client"

import React, { useState, useEffect } from 'react';

const token = process.env.NEXT_PUBLIC_TMDB_URI;

interface MovieData {
    backdrops: any[];
    file_path: string;
}

export default function MovieLoader() {
    const [currentMovie, setCurrentMovie] = useState<MovieData | null>(null);
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [currentImageURL, setCurrentImageURL] = useState<string>("");

    const [nextMovie, setNextMovie] = useState<MovieData | null>(null);
    const [nextTitle, setNextTitle] = useState<string>("");
    const [nextImageURL, setNextImageURL] = useState<string>("");

    const fetchValidMovie = async (): Promise<{
        movieData: any;
        title: string;
        imageURL: string;
    }> => {
        while (true) {
            const randomNumber = Math.floor(Math.random() * 5000 + 500);

            try {
                const [imageRes, infoRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${randomNumber}/images`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${randomNumber}?language=en-US`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }),
                ]);

                if (!imageRes.ok || !infoRes.ok) continue;

                const imageData = await imageRes.json();
                const infoData = await infoRes.json();
                const backdrop = imageData.backdrops?.[20] || imageData.backdrops?.[0];

                if (!backdrop) continue;

                return {
                    movieData: imageData,
                    title: infoData.title,
                    imageURL: `https://image.tmdb.org/t/p/original${backdrop.file_path}`,
                };
            } catch (err) {
                console.error("Error during fetch:", err);
            }
        }
    };

    const handleClick = () => {
        if (nextMovie) {
            setCurrentMovie(nextMovie);
            setCurrentTitle(nextTitle);
            setCurrentImageURL(nextImageURL);
        }

        fetchValidMovie().then(({ movieData, title, imageURL }) => {
            setNextMovie(movieData);
            setNextTitle(title);
            setNextImageURL(imageURL);
        });
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-10 gap-6 bg-gray-950 min-h-screen text-white">
            <button
                onClick={handleClick}
                className="rounded px-6 py-3 text-xl hover:bg-purple-800 hover:scale-105 font-bold transition-all duration-300 bg-black"
            >
                Start the Game
            </button>

            {currentTitle && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">🎬 Now Playing: {currentTitle}</h2>
                    <img src={currentImageURL} alt={currentTitle} className="rounded-xl max-w-full h-auto shadow-lg" />
                </div>
            )}

            {nextTitle && (
                <div className="text-center mt-10 opacity-60">
                    <h3 className="text-xl font-semibold">🔮 Coming Next: {nextTitle}</h3>
                    <img src={nextImageURL} alt={nextTitle} className="rounded max-w-xs h-auto mt-2" />
                </div>
            )}
        </div>
    );
}
