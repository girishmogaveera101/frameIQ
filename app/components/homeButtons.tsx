"use client"

import React from 'react'
import Link from 'next/link';

function homeButtons() {
    return (
        <div>
            <center>

                <Link href='/game'>
                    <button className="rounded h-15 text-xl mt-10 hover:bg-black hover:w-70 font-bold transition-all duration-300 w-60 bg-blue-800">Start Game</button>
                </Link>
                <br />
                <Link href='/contribute'>
                    <button className="rounded h-15 text-xl my-10 hover:bg-green-600 hover:w-70 font-bold transition-all duration-300 w-45 bg-black">Contribute</button>
                </Link>
            </center>
        </div>
    )
}

export default homeButtons