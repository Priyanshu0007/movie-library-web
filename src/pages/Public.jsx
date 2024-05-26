import { useParams } from 'react-router'
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";

import { MdDelete } from 'react-icons/md';
import { getDatabase, ref, onValue } from "firebase/database";


const List= ({val,id})=>{

    const [data,setData]=useState(null);

    useEffect(()=>{
        fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${val.id}`).then(res=>res.json()).then(data=>{setData(data)}).catch(err=>{console.log(err);})
      },[val])


    if(data){return(<div className='flex gap-2 items-center'>
            <div className='w-[30%]'><img className='h-[250px] w-[200px] rounded-2xl' src={data.Poster} alt='img'/></div>
            <div className='w-[50%] flex items-center text-wrap'>
              <p>{data.Title}</p>
            </div>
            </div>)}

}
const Public = () => {
  const { uid,id } = useParams();
  const db = getDatabase();
  const [data,setData]=useState(null)
  useEffect(()=>{
    onValue(ref(db,`${uid}/public/${id}`),(snapshot)=>setData(snapshot.val()))
  },[db, id, uid])
  useEffect(()=>{console.log(data);},[data])
  if(data){
    delete data.id
  return (
    <div className='w-[70%] p-4'>
      {/* {`Public - ${uid} - ${id} `} */}
      <div className='w-full text-4xl text-center'>
        <p>This is list</p>
      </div>
      {Object.entries(data).length>0 ? Object.entries(data).map((d,key)=>{
                return(<div key={key} className="p-2 my-2 bg-green-300 rounded-2xl">
                        <List key={key} val={d[1]}/>
                      </div>)
              }):<p>No list exist</p>}
    </div>
  )}
}

export default Public