import React from 'react'
import { BsFillCameraReelsFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='py-8 flex justify-between items-center'>
        <div className='text-green-600 text-6xl sm:text-7xl '><BsFillCameraReelsFill/></div>
        <div className='sm:text-6xl text-5xl text-green-600'>FilmyMaaza</div>
        <div></div>
    </div>
  )
}

export default Navbar