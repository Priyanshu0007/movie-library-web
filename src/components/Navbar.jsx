import { BsFillCameraReelsFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div className='py-8 flex justify-between items-center'>
        <div className='text-green-600 text-6xl sm:text-7xl '><BsFillCameraReelsFill onClick={()=>navigate('/')}/></div>
        <div className='sm:text-6xl text-5xl font-medium text-green-600'>FilmyMaaza</div>
        <div></div>
    </div>
  )
}

export default Navbar