import React from 'react'
import { Github,Instagram,Linkedin, User } from "lucide-react";

function Footer() {
    return (
        <div className='bg-black w-full text-white'>
            <div className="flex">
                <a href="">
                    <p className=""><Github/></p>
                </a>
                <a href="">
                    <p className=""><Linkedin /></p>
                </a>
                <a href="">
                    <p className=""><User/></p>
                </a>
                <a href="">
                    <p className=""><Instagram/></p>
                </a>
            </div>
        </div>
    )
}

export default Footer