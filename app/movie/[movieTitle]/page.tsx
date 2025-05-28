"use client"

import { useParams } from 'next/navigation';
import Navbar from '../../components/navbar'


export default function ProductPage() {
  const params = useParams();
  const rawTitle = params.movieTitle as string;
  const movieTitle = decodeURIComponent(rawTitle);
  return (
    <>
      <Navbar />
      <div className="mt-40 text-white p-30 pb-90 text-4xl">
        Title :  {movieTitle}
      </div>
    </>
  );
}
