"use client"

import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { username } = useParams();

  return (
    <>
    <div className="mt-40 text-white text-4xl">
       hiii {username}
    </div>
    </>
  );
}
