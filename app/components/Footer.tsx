import React from 'react'
import { Github, Instagram, Linkedin, User } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-black md:mt-5 text-white flex flex-col">
            <div className="flex md:flex-row flex-col">
                <div className="md:my-20 text-center md:w-[40%] border-0">
                    <p className="md:text-2xl text-1xl mt-10 mb-1 text-gray-300 font-bold">FrameIQ</p>
                    <p className="text-sm  text-gray-400">A Movie Guessing Game • Built by <a className='hover:text-purple-500' href='https://girishmogaveera101.github.io/Girish-Mogaveera/'>Girish</a></p>
                </div>
                <div className="md:w-[60%] flex flex-col mt-20 justify-center items-center">
                    <div className="border-l-1 border-purple-400 pl-3">
                        <p className="md:text-left text-xs mb-2 text-gray-400 md:mb-5">Connect me here</p>
                        <div className="flex justify-center items-center flex-row space-x-8 md:space-x-8">
                            <a href="https://github.com/girishmogaveera101" target="_blank" rel="noopener noreferrer">
                                <p className="text-gray-300 transition-all duration-200 hover:text-purple-400"><Github /></p>
                            </a>
                            <a href="https://linkedin.com/in/girishmogaveera" target="_blank" rel="noopener noreferrer">
                                <p className="text-gray-300 transition-all duration-200 hover:text-purple-400"><Linkedin /></p>
                            </a>
                            <a href="https://instagram.com/girizhh" target="_blank" rel="noopener noreferrer">
                                <p className="text-gray-300 transition-all duration-200 hover:text-purple-400"><Instagram /></p>
                            </a>
                            <a href="https://girishmogaveera101.github.io/Girish-Mogaveera/" target="_blank" rel="noopener noreferrer">
                                <p className="text-gray-300 transition-all duration-200 hover:text-purple-400"><User /></p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="text-sm mt-4">
                <p className='text-xs mt-4 text-gray-600'>&copy; {new Date().getFullYear()} FameIQ. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer