"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";

const token = process.env.NEXT_PUBLIC_TMDB_URI;

interface MovieDataType {
  id: number;
  title: string;
  imageURL?: string;
  rating?: number;
  director?: string;
  overview?: string;
  releasedate?: string;
}

export default function Page() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [moviesData, setMoviesData] = useState<MovieDataType[]>([]);
  const [idArray, setIdArray] = useState<number[]>([]);

  const getid = async () => {
    try {
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
      const ids = resData.results.map((movie: any) => movie.id);
      setIdArray(ids);

      const movies: MovieDataType[] = [];

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        const infoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imageRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const infoData = await infoRes.json();
        const imageData = await imageRes.json();

        const backdrop =
          imageData.backdrops?.[19]?.file_path || imageData.backdrops?.[17]?.file_path || imageData.backdrops?.[3]?.file_path || imageData.backdrops?.[2]?.file_path || imageData.backdrops?.[0]?.file_path;

        movies.push({
          id,
          title: infoData.title,
          imageURL: `https://image.tmdb.org/t/p/original${backdrop}`,
          rating: infoData.vote_average,
          overview: infoData.overview,
          releasedate: infoData.release_date,
        });
      }

      setMoviesData(movies);
    } catch (error) {
      console.error("💥 Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <center>
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
        <button
          onClick={getid}
          className="rounded h-15 text-xl mt-10 mb-10 hover:bg-purple-800 hover:w-70 font-bold transition-all duration-300 w-60 bg-black text-white"
        >
          Get ID and Image Data
        </button>

        <div className="flex flex-wrap justify-center gap-4">
          {moviesData.map((movie, i) => (
            <div
              key={movie.id}
              className="border border-black p-4 w-64 bg-white shadow-md"
            >
              <img
                src={movie.imageURL}
                alt={movie.title}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="text-black font-bold">{movie.title}</p>
              <p className="text-black text-sm">{movie.releasedate}</p>
              <p className="text-black text-sm">⭐ {movie.rating}</p>
            </div>
          ))}
        </div>
      </center>
    </>
  );
}
