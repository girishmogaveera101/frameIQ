"use client"

import React, { useState, useEffect } from 'react'

interface PopUpProps {
    errorStatus: boolean;
    msg: string;
  }

  const PopUp: React.FC<PopUpProps> = ({ errorStatus, msg }) => {

    const [showPopUp, setShowPopUp] = useState<boolean>(true)
    useEffect(()=>{
        setShowPopUp(true)
        setTimeout(() => {
            setShowPopUp(false)
        }, 2000);
    },[])

    if (!showPopUp) return null

    return (
        <div className={`fixed ${errorStatus? 'bg-red-600': 'bg-green-600'} rounded top-30 z-50 left-1/2 transform -translate-1/2 py-3 px-10`}>
            <p className="font-extrabold">{msg}</p>
        </div>
    )
}

export default PopUp;