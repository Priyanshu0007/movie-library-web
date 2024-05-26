import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/firebase';
import { BsFillUnlockFill,BsFillLockFill } from "react-icons/bs";
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
    <div className='w-[90%] md:w-[80%] flex flex-col '>
        <Navbar/>
        {data ?<div className='w-full flex items-center justify-center flex-col md:flex-row'>
            <div className='w-[90%] md:w-[60%] flex flex-col gap-4 items-center'>
                <p className='text-2xl px-4 py-2 rounded-2xl bg-green-300'>{data.Title}</p>
                <img src={data.Poster} className='w-[400px] h-[500px] rounded-2xl'/>
                <p>Year - {data.Year}</p>
            </div>
            <div className='w-[40%]'>
            <div className='flex gap-4 !justify-start'>
                <div className='w-[50%] flex flex-col justify-center gap-3'>
                {firebase.privateData ? Object.entries(firebase.privateData).map((data,key)=>{
                    return(<button key={key} onClick={()=>addToPrivate(Number(data[0]))} className='flex items-center justify-between px-4 py-2 bg-green-400 rounded-2xl'>
                                <p>Add To Private List - {key+1}</p>
                                <BsFillLockFill/>
                            </button>)
                }):<div></div>}
                </div>
                <div className='w-[50%] flex flex-col justify-start gap-3'>
                {firebase.publicData ? Object.entries(firebase.publicData).map((data,key)=>{
                    return(<button key={key} onClick={()=>addToPublic(Number(data[0]))} className='flex items-center justify-between px-4 py-2 bg-green-500 rounded-2xl'>
                                <p>Add To Public List - {key+1}</p>
                                <BsFillUnlockFill/>
                            </button>)
                }):<div></div>}
                </div>
                </div>
            </div>
        </div>: <p>Loading</p>}
        
    </div>
  )
}

export default Details