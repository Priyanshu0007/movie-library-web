import { BsFillCameraReelsFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useFirebase } from "../context/firebase";
import { toast } from "sonner";

const Navbar = () => {
    const navigate=useNavigate();
    const firebase=useFirebase()
  return (
    <div className='px-4 md:px-0 py-8 flex justify-between items-center'>
        <div className='text-indigo-600 text-4xl sm:text-5xl transition ease-in-out duration-300 hover:cursor-pointer hover:text-indigo-500'><BsFillCameraReelsFill onClick={()=>navigate('/')}/></div>
        <div className='sm:text-5xl text-3xl font-medium text-indigo-600'>FilmyMaaza</div>
        <div onClick ={()=>{firebase.signOutUser();toast.success('Succesfull Logged Out',{duration:3000})}} className="text-xl md:text-2xl px-4 py-1  md:px-4 md:py-1 rounded-2xl hover:cursor-pointer hover:bg-red-600 bg-red-500 text-white">Logout</div>
    </div>
  )
}

export default Navbar