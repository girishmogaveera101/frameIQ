import LatestMovies from './components/latestMovies'
import Navbar from './components/navbar'
import Heading from './components/heading'
import HomeButtons from './components/homeButtons'
import { Suspense } from 'react';




export default function Home() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <Heading />
      <LatestMovies />
      <HomeButtons />
    </div>
  );
}