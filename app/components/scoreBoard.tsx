"use client"

import React, { useState, useEffect } from 'react';



function scoreBoard() {

  const getScoreBoard = async () => {
    const res = await fetch('/api/getScoreBoard', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const resData = res.json();
    console.log(resData);
  }

  useEffect(() => {
    getScoreBoard();
  }, [])


  return (
    <div className=' w-[90%] ml-[5%] md:ml-[25%] p-4 h-100 bg-gray-200 rounded-2xl shadow-2xl'>
      <p className="text-center text-gray-950 font-extrabold text-2xl md:text-3xl">Scoreboard</p>
      <div className="text-gray-900 flex flex-row justify-between">
        <p className="">1</p>
        <p className="">admin</p>
        <p className="">17</p>
      </div>
      <div className="text-gray-900 flex flex-row justify-between">
        <p className="">2</p>
        <p className="">admin</p>
        <p className="">13</p>
      </div>
      <div className="text-gray-900 flex flex-row justify-between">
        <p className="">3</p>
        <p className="">admin</p>
        <p className="">7</p>
      </div>
    </div>
  )
}

export default scoreBoard