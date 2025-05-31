"use client"

import React,{useEffect} from 'react'

function leaderboard() {

  useEffect(()=>{
    findLeaderboardScore();
  },[])

  const findLeaderboardScore = async () => {
    const response = await fetch('');
    const resData = await response.json();
    console.log(resData)
  }

  return (
    <div>
      <p className="">Leaderboard</p>
      <div className="">
        <p className="">sl.no</p>
        <p className="">username</p>
        <p className="">score</p>
      </div>
      <div className="">
        <p className="">sl.no</p>
        <p className="">username</p>
        <p className="">score</p>
      </div>
      <div className="">
        <p className="">sl.no</p>
        <p className="">username</p>
        <p className="">score</p>
      </div>
      <div className="">
        <p className="">sl.no</p>
        <p className="">username</p>
        <p className="">score</p>
      </div>
    </div>
  )
}

export default leaderboard