import React from 'react'
import { BsFillUnlockFill,BsFillLockFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const MovieCard = ({title,year,img,type}) => {
  return (
    <div className='rounded-full flex flex-col mx-6 my-4 p-4 justify-between bg-green-100'>
        <div className='flex justify-center'>
            <img className='w-[250px] h-[350px] rounded-2xl' src={img} alt={title}/>
        </div>
        <p className='text-xl text-gray-950'>{title}</p>
        <p className='text-lg text-gray-800'>{year}</p>
        <div className='flex justify-between'>
            <div className='flex items-center gap-2 text-xs md:text-md bg-green-200 transition ease-in-out delay-200 p-1 md:p-2 rounded-xl hover:bg-green-300 hover:cursor-pointer'>Add to private<BsFillLockFill/></div>
            <div className='flex items-center gap-2 text-xs md:text-md bg-green-200 transition ease-in-out delay-200 p-1 md:p-2 rounded-xl hover:bg-green-300 hover:cursor-pointer'>Add to public<BsFillUnlockFill/></div>
        </div>
    </div>
  )
}

export default MovieCard