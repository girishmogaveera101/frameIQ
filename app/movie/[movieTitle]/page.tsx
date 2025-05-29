"use client"

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'


export default function ProductPage() {
  const params = useParams();
  const rawTitle = params.movieTitle as string;
  const movieTitle = decodeURIComponent(rawTitle);

  useEffect(() => {
    findMovie()
    console.log(movieTitle)
  }, [movieTitle]);

  const findMovie = async () => {
    const response = await fetch('/api/findMoviedataFromTitle', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title:movieTitle}),
    });
    const resData = await response.json();
    console.log(resData)
  }

  return (
    <>
      <Navbar />
      <div className="mt-40 text-white p-30 pb-90 text-4xl">
        Title :  {movieTitle}
      </div>
    </>
  );
}
