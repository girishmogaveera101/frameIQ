"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '../../components/navbar';
import { useRouter } from 'next/navigation'


interface UserDetailstype {
  _id: string;
  age?: number;
  bio?: string;
  email?: string;
  favCharacter?: string;
  fullname?: string;
  phone?: number;
}

export default function ProductPage() {
  const router = useRouter()
  const { username } = useParams();

  const [userDetails, setuserDetails] = useState<UserDetailstype | null>(null);
  const [isProfilePicMenuOpen, setIsProfilePicMenuOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePic, setProfilePic] = useState<number>(0)


  const images = Array.from({ length: 18 }, (_, i) => i + 1);


  const fetchProfileData = async () => {
    const res = await fetch('/api/getProfileData', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username
      })
    });
    const d = await res.json();
    const resData = d.trueUser;
    setuserDetails(resData)
    setFullName(resData?.fullname)
    setAge(resData?.age);
    setEmail(resData?.email);
    setPhone(resData?.phone);
    setBio(resData?.bio);
    setProfilePic(resData?.profilepic)
    console.log(resData);
  }


  useEffect(() => {
    fetchProfileData();
  }, [])

  const updateProfile = async () => {
    console.log(profilePic);
    const res = await fetch('/api/updateProfile', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fullname: fullName,
        age: age,
        email: email,
        phone: phone,
        bio: bio,
        profilepic: profilePic
      })
    });
    const resData = await res.json();
    console.log(resData);
    fetchProfileData();
  }


  return (
    <>
      <Navbar />



      <div className="md:mt-40 mt-15 py-10 md:pb-50 flex md:flex-row flex-col-reverse">

        <div className="  md:pl-50 md:border-r-2 px-5 border-gray-600 md:text-xl md:ml-20 md:w-[60%]">

          <div className="bg-black md:bg-transparent rounded-2xl w-[60%] md:ml-0 ml-[20%]">
            <p className="md:text-6xl mt-10 mb-5 border-white md:text-left text-center text-xl font-extrabold bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">- @{username} -</p>
          </div>


          <div className="flex flex-col bg-gray-950 md:bg-transparent rounded-2xl px-3 justify-center items-left">
            <div className="">
              Full Name : <input className='border-l-2 focus:outline-0 border-purple-400 mt-2 md:mt-15 ml-3 pl-3'
                placeholder='Enter fullname' type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} /><br />
            </div>

            <div className="">
              Bio : <input className='border-l-2 focus:outline-0 border-purple-400  mt-10 md:mt-15 ml-3 pl-3'
                placeholder='Enter the Bio here' type="text" value={bio} onChange={(e) => { setBio(e.target.value) }} /><br />
            </div>

            <div className="">
              Age : <input className='border-l-2 focus:outline-0 border-purple-400  mt-10 md:mt-15 ml-3 pl-3'
                placeholder='Enter your Age' type="number" value={age} onChange={(e) => { setAge(e.target.value) }} /><br />
            </div>

            <div className="">
              email : <input className='border-l-2 focus:outline-0 border-purple-400 mt-10 md:mt-15 ml-3 pl-3'
                placeholder='Enter email' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
            </div>

            <div className="">
              Phone no : <input className='border-l-2 focus:outline-0 border-purple-400  mt-10 md:mt-15 ml-3 pl-3'
                placeholder='Enter phone number' type="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} /><br />
            </div>
          </div>



          <input type="submit"
            className='bg-blue-600 hover:bg-blue-800 transition-all duration-200 rounded py-1 px-5 mt-10'
            value="Update Profile" onClick={updateProfile} />
          <input type="submit"
            className='bg-red-600 ml-5 hover:bg-red-800 transition-all duration-200 rounded py-1 px-5 mt-10'
            value="logout" onClick={() => { router.push('/login') }} />


        </div>







        <div className=" md:w-[40%] flex flex-col items-center justify-center">
          <div style={{
            backgroundImage: `url("/images/profilePictures/pfl${profilePic}.jpeg")`,
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat',
          }}
            className={`md:h-100 md:w-100 h-50 w-50 rounded-full hover:scale-110 transition-all duration-200 resize-none`}>
          </div>
          <p className="mt-2 font-extrabold text-blue-300 cursor-pointer"
            onClick={() => { setIsProfilePicMenuOpen(true) }}>change profile</p>
        </div>



        {isProfilePicMenuOpen &&
          <div className="fixed border-2 rounded-xl border-pink-700 top-1/2 shadow-xl shadow-pink-950 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:h-200 h-150 z-10 w-[90%] bg-black">
            <div className="h-[10%] flex items-center justify-center">
              <p className="text-2xl text-purple-400">Select a profile Picture</p>
            </div>
            <div className="flex overflow-scroll flex-wrap h-[80%] flex-row justify-around items-around">
              {images.map((image) => (
                <div key={image} style={{
                  backgroundImage: `url("/images/profilePictures/pfl${image}.jpeg")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                  onClick={() => { setProfilePic(image) }}
                  className={`md:h-70 md:w-70 md:m-5 m-2 h-[90px] hover:scale-103 transition-all duration-200 w-[90px] rounded-full border-1 border-gray-600 resize-none`}>
                </div>
              ))}
            </div>
            <div className="h-[10%] flex flex-row items-center">
              <button className='bg-purple-800 rounded h-10 m-5 py-1 px-3'
                onClick={() => { setIsProfilePicMenuOpen(false) }}>
                cancel
              </button>
              <button className='bg-blue-800 rounded h-10 m-5 py-1 px-3'
                onClick={() => { setIsProfilePicMenuOpen(false) }}>
                select Profile
              </button>
            </div>
          </div>
        }






      </div>
    </>
  );
}
