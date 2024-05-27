
import { useNavigate } from "react-router";
// eslint-disable-next-line react/prop-types
const MovieCard = ({title,year,img,id}) => {
    const navigate=useNavigate();
  return (
    <div onClick={()=>{navigate(`/details/${id}`)}} className='rounded-full flex flex-col gap-2 mx-6 my-4 p-4 justify-between shadow-2xl hover:cursor-pointer transition ease-in-out delay-300 hover:shadow-green-300 hover:bg-green-200  shadow-green-200 bg-green-100'>
        <div className='flex justify-center'>
            <img className='w-[250px] h-[350px] rounded-2xl' src={img} alt={title}/>
        </div>
        <p className='text-xl text-wrap text-gray-950'>{title}</p>
        <p className='text-lg text-gray-800'>{year}</p>
        {/* <div className='flex justify-between'>
            <div className='flex items-center gap-2 text-xs md:text-md bg-green-200 transition ease-in-out delay-200 p-2 md:p-2 rounded-xl hover:bg-green-300 hover:cursor-pointer'>Add to private<BsFillLockFill/></div>
            <div className='flex items-center gap-2 text-xs md:text-md bg-green-200 transition ease-in-out delay-200 p-2 md:p-2 rounded-xl hover:bg-green-300 hover:cursor-pointer'>Add to public<BsFillUnlockFill/></div>
        </div> */}
    </div>
  )
}

export default MovieCard