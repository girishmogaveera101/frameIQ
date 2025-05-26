"use client"

import React, { useState, useEffect, use } from 'react'



function page() {


    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [favCharacter, setFavCharacter] = useState<string>("");


    const handleSignup = async () => {
        alert("woking")
    }


    return (
        <>
            <form onSubmit={handleSignup} className="">
                <div className='mt-30 mb-10 ml-[5%] h-130 md:h-150 justify-center items-center flex w-[90%] border-0'>
                    <div className="h-100 rounded-2xl flex flex-col shadow-2xl shadow-black justify-center items-center bg-black w-[90%] md:w-150">
                        <p className="md:text-5xl mb-5 md:mb-0 text-3xl text-purple-400 font-extrabold">signup</p>
                        <div className="flex flex-row m-5 border-0 md:mt-15">
                            <p className="w-[50%] text-right">username</p>
                            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='astroidblastyer69' required />
                        </div>
                        <div className="flex flex-row m-5 border-0">
                            <p className="w-[50%] text-right">password</p>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='*******' required />
                        </div>
                        <div className="flex flex-row m-5 border-0">
                            <p className="w-[50%] text-right">fav character</p>
                            <input type="text" value={favCharacter} onChange={(e) => { setFavCharacter(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='Batman' />
                        </div>
                        <button className="bg-purple-400 border-1 text-black font-extrabold md:text-xl md:px-10 px-5 hover:md:px-17 transition-all duration-400 hover:border-1 hover:border-blue-400 hover:bg-black hover:text-blue-400 py-1 mt-7">signup</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default page