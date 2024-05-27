import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/firebase';
import { BsFillUnlockFill,BsFillLockFill } from "react-icons/bs";
import trash from "../assets/trash.jpg"
import { toast } from 'sonner';
const Details = () => {
    const {id}=useParams();
    const [data,setData]=useState(null)
    const firebase = useFirebase()
    const nagivate=useNavigate()
    useEffect(()=>{
        if(!firebase.user?.email){nagivate('/sign')}
    },[firebase,nagivate])
    useEffect(()=>{
        fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${id}`).then(res=>res.json()).then(data=>{setData(data)}).catch(err=>{console.log(err);})
      },[id])
    const addToPrivate=(idd)=>{
        firebase.putData(`${firebase.user.uid}/private/${idd}/${id}`,{
            id:id
        });
    }
    const addToPublic=(idd)=>{
        firebase.putData(`${firebase.user.uid}/public/${idd}/${id}`,{
            id:id
        });
    }

  return (
    <div className='w-[100%] md:w-[80%] flex flex-col mb-4'>
        <Navbar/>
        {data ?<div className='w-full flex items-center justify-center gap-4 flex-col md:flex-row'>
            <div className='w-[80%] md:w-[60%] flex flex-col gap-4 items-center'>
                <p className='text-2xl px-4 py-2 rounded-2xl bg-green-300 text-wrap'>{data.Title}</p>
                <img src={data.Poster} className='w-[400px] h-[500px] rounded-2xl'/>
                <div className='w-full md:w-[60%] p-4 bg-green-200 rounded-2xl flex flex-col gap-2'>
                    <p className='text-3xl'>Basic Details</p>
                    <p>Release Date : {data.Released}</p>
                    <p>Genre : {data.Genre}</p>
                    <p>Language : {data.Language}</p>
                    <p>Actor : {data.Actors}</p>
                </div>
            </div>
            <div className='w-[100%] md:w-[40%] flex flex-col gap-2'>
                <div className='w-[80%] md:w-[100%] p-4 rounded-2xl mx-auto flex gap-4 flex-col !justify-start bg-green-200'>
                    <p className='text-3xl'>Plot</p>
                    <p className='tracking-widest'>{data.Plot}</p>
                </div>
                <div className='w-[80%] md:w-[100%] p-4 rounded-2xl mx-auto flex gap-4 flex-col !justify-start bg-green-200'>
                    <p className='  text-3xl'>Add to list</p>
                    <div className=' flex flex-col justify-center gap-3'>
                    {firebase.privateData ? Object.entries(firebase.privateData).map((data,key)=>{
                        return(<button key={key} onClick={()=>{addToPrivate(Number(data[0]));toast.success('Added to private list'),{duration:3000}}} className='flex items-center justify-between px-4 py-2 bg-green-400 rounded-2xl'>
                                    <p>Add To Private List - {key+1}</p>
                                    <BsFillLockFill/>
                                </button>)
                    }):<div>No private list</div>}
                    </div>
                    <div className=' flex flex-col justify-start gap-3'>
                    {firebase.publicData ? Object.entries(firebase.publicData).map((data,key)=>{
                        return(<button key={key} onClick={()=>{addToPublic(Number(data[0]));toast.success('Added to public list'),{duration:3000}}} className='flex items-center justify-between px-4 py-2 bg-green-500 rounded-2xl'>
                                    <p>Add To Public List - {key+1}</p>
                                    <BsFillUnlockFill/>
                                </button>)
                    }):<div>No public list</div>}
                    </div>
                </div>
                <div className='w-[80%] md:w-[100%] p-4 rounded-2xl mx-auto flex gap-4 flex-col !justify-start bg-green-200'>
                    <p className='text-3xl'>Rating</p>
                    {data.Ratings.map((da,key)=>(
                        <div key={key}>
                            <p className='text-xl font-semibold'>{da.Source}</p>
                            <p>{da.Value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>: <p className='text-3xl p-4 md:p-0'>Loading....</p>}
        
    </div>
  )
}

export default Details