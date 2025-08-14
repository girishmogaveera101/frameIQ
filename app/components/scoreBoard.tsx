"use client"

import React, { useState, useEffect } from 'react';

interface ScoreBoardDataType {
  _id: string,
  record: number,
  username: string
}

function scoreBoard() {

  const [scoreBoardData, setScoreBoardData] = useState<ScoreBoardDataType[]>([]);

  const getScoreBoard = async () => {
    const res = await fetch('/api/getScoreBoard', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const resData: { highrecord: ScoreBoardDataType[] } = await res.json();
    // console.log(resData.highrecord);
    setScoreBoardData(resData.highrecord)
  }

  useEffect(() => {
    getScoreBoard();
  }, [])


  return (
    <div className=' md:w-[15%] w-[80%] ml-[10%] mb-30 md:ml-[5%] md:mb-30 md:mt-10 p-4 shadow-black overflow-hidden h-100 bg-black rounded-2xl shadow-2xl'>
      <p className="text-center h-[10%] text-red-500 font-extrabold text-2xl md:text-2xl">Leaderboard</p>
      
      <div className="overflow-scroll h-[10%] w-full">
        <div className="text-gray-900 flex flex-row justify-between">
          <p className="text-purple-400 font-extrabold md:text-2xl text-xl w-[25%] mb-5">Rank</p>
          <p className="text-purple-400 font-extrabold md:text-2xl text-xl w-[45%] text-left">Username</p>
          <p className="text-purple-400 font-extrabold md:text-2xl text-xl w-[30%]">Score</p>
        </div>
      </div>

      <div className="overflow-scroll h-[80%] w-full">
      {scoreBoardData.map((data, index) => (
        <div key={data._id} className="text-gray-900 flex flex-row justify-between">
          <p className="text-white text-xl w-[25%] mb-5">#{index + 1}</p>
          <p className="text-white text-xl w-[45%] text-left">{data.username}</p>
          <p className="text-white text-xl w-[30%]">{data.record}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default scoreBoard