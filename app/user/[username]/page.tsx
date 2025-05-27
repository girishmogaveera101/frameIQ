"use client"

import { useParams } from 'next/navigation';
import Navbar from '../../components/navbar'


export default function ProductPage() {
  const { username } = useParams();

  return (
    <>
      <Navbar />
      <div className="mt-40 text-white text-4xl">
        hiii {username}
      </div>
    </>
  );
}
