/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { useFirebase } from '../context/firebase';
import { toast } from 'sonner';

const List= ({val,id})=>{

    const [data,setData]=useState(null);
    const firebase = useFirebase()

    useEffect(()=>{
        fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${val}`).then(res=>res.json()).then(data=>{setData(data)}).catch(err=>{console.log(err);})
      },[val])

    const deleteData=()=>{
        firebase.putData(`${firebase.user.uid}/private/${id}/${data.imdbID}`,{
            id:null
        });
        toast.success('Removed from list',{duration:3000})
    }

    if(data){return(<div className='flex gap-2 items-center justify-between'>
            <div className='w-[30%]'><img className='h-[80px] w-[80px] rounded-2xl' src={data.Poster} alt='img'/></div>
            <div className='w-[50%] flex items-center text-wrap'><p>{data.Title}</p></div>
            <div className=' text-2xl p-1 rounded-full transition ease-in-out duration-300 hover:cursor-pointer' onClick={deleteData}><IoIosRemoveCircle/></div>
            </div>)}

}

const ListCard = ({data}) => {
    const {id,...temp} =data;
    // delete data.id;

  return (
    <div className='flex flex-col gap-4 p-2'>
        {Object.entries(temp).length>0 ? Object.entries(temp).map((d,k)=>{
            return(<List key={k} val={d[0]} id={id}/>)
        }):<p>No data</p>}
    </div>
  )
}

export default ListCard