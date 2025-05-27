"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '../components/loading'
import Link from 'next/link'

function page() {

    const router = useRouter()

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [favCharacter, setFavCharacter] = useState<string>("");
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false)
    const [messgae, setMessage] = useState<string>(" ");


    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingStatus(true)
        const response = await fetch('/api/signupUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, favCharacter }),
        });
        const resData = await response.json();
        console.log(resData)
        if (response.status == 400) {
            console.log("username already used")
            setTimeout(() => {
                setLoadingStatus(false)
                setMessage("Username already Used")
            }, 3000)
            return;
        }
        if (response.status == 200) {
            console.log("success")
            setTimeout(() => {
                router.push(`/?username=${encodeURIComponent(username)}`);
                setLoadingStatus(false)
            }, 3000)
            return;
        }
        else {
            setLoadingStatus(false)
            console.log("error")
            setMessage("Error occured")
            return;
        }
    }


    return (
        <>
            <form onSubmit={handleSignup} className="flex flex-col justify-center items-center">
                <div className='mt-30 ml-[0%] border-0 h-130 md:h-150 justify-center items-center flex-col flex w-[90%]'>
                    <div className="h-100 rounded-2xl flex flex-col shadow-2xl shadow-black justify-center items-center bg-black w-[90%] md:w-150">
                        <p className="md:text-5xl mb-5 md:mb-0 text-3xl text-purple-400 font-extrabold">signup</p>
                        <div className="flex flex-row m-5 border-0 md:mt-15">
                            <p className="w-[50%] text-right">username</p>
                            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='astroidblaster69' required />
                        </div>
                        <div className="flex flex-row m-5 border-0">
                            <p className="w-[50%] text-right">password</p>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='*******' required />
                        </div>
                        {loadingStatus && <Loading />}
                        <div className="flex flex-row m-5 border-0">
                            <p className="w-[50%] text-right">fav character</p>
                            <input type="text" value={favCharacter} onChange={(e) => { setFavCharacter(e.target.value) }}
                                className="border-l-1 border-purple-400 w-[50%] ml-5 pl-2 focus:outline-0"
                                placeholder='Batman [optional]' />
                        </div>
                        <button className="bg-purple-400 border-1 text-black font-extrabold md:text-xl md:px-10 px-5 hover:md:px-17 transition-all duration-400 hover:border-1 hover:border-blue-400 hover:bg-black hover:text-blue-400 py-1 mt-7">signup</button>
                        <Link href='/login'>
                            <p className="hover:text-blue-400 text-gray-400 text-xs mt-3">Already have an account?</p>
                        </Link>
                    </div>
                </div>
                <p className="border-0 md:w-[30%] md:mt-[-70] mt-[-50]  text-red-500 mb-20">{messgae}</p>

            </form>
        </>
    )
}

export default page