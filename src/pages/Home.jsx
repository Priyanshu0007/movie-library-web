/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router";
import ListCard from "../components/ListCard";
import PublicListCard from "../components/PublicListCard";
import { IoIosLink } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
 const arr=['marvel','star','lego',"game",'harry',"walking",'pirates']
const Home = () => {
  const [search,setSearch]=useState("");
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&s=${arr[Math.floor(Math.random()*arr.length)]}`).then(res=>res.json()).then(data=>{setData(data.Search)}).catch(err=>{console.log(err);})
  },[])
  useEffect(()=>{  
    if(search.length>2){
      setLoading(true);
    setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&s=${search}`).then(res=>res.json()).then(data=>{console.log(data);setData(data.Search)}).catch(err=>{console.log(err);})
   }, 3000);
      setLoading(false);
    }
  },[search])
  const firebase = useFirebase()
  const nagivate=useNavigate()
  
  useEffect(()=>{
    if(!firebase.user?.email){nagivate('/sign')}
    else{nagivate('/')}
  },[firebase,nagivate])

  const createPrivateList=()=>{
    var r = Math.floor(Math.random() * 16);
    firebase.putData(`${firebase.user.uid}/private/${r}`,{id:r});
    toast.success('Created new list',{duration:3000})
  }
  const createPublicList=()=>{
    var r = Math.floor(Math.random() * 16);
    firebase.putData(`${firebase.user.uid}/public/${r}`,{id:r});
    toast.success('Created new list',{duration:3000})
  }
  const deletePublicList=(data)=>{
    firebase.putData(`${firebase.user.uid}/public/${data[0]}`,{id:null});
    toast.success('List deleted succesfully',{duration:3000})
  }
  const deletePrivateList=(data)=>{
    firebase.putData(`${firebase.user.uid}/private/${data[0]}`,{id:null});
    toast.success('List deleted succesfully',{duration:3000})
  }
  

  return (
    <div className="w-[100%] md:w-[80%] flex flex-col">
      <Navbar/>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl py-4 text-indigo-800 w-[75%] px-6 md:px-8">Search any movie</p>
        <input value={search} onInput={e => setSearch(e.target.value)} type="text" className="h-14 w-[70%] pr-8 pl-5 rounded z-0 focus:shadow-indigo-300 focus:shadow-2xl focus:outline-none" placeholder="Enter three char atleast..."></input>
        <div className="w-full flex flex-col lg:flex-row items-center md:items-start">
          <div className="w-[90%] lg:w-[65%] grid gap-8 grid-cols-1 md:grid-cols-2 pt-4">
            {!data && <p className="text-indigo-600 text-center">No Results Found</p>}
            {loading && <p className="text-3xl">Loading</p>}
            {!loading && data?.map((mo,id)=>{
              return(<MovieCard key={id} id={mo.imdbID} title={mo.Title} year={mo.Year} img={mo.Poster} type={mo.Type}/>)
            })}
          </div>
          <div className="w-[100%] lg:w-[35%] pt-4">
            <div className="m-4 bg-indigo-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <p className="text-indigo-800 text-2xl font-semibold">Public List</p>
                <button onClick={createPublicList} className="px-2 py-1 rounded-2xl bg-indigo-400 hover:bg-indigo-500 transition ease-in-out duration-300">New List</button>
              </div>
              {firebase.publicData ? Object.entries(firebase.publicData).map((data,key)=>{
                  async function copyToClip(data) {
                    await navigator.clipboard.writeText(`${location.href}public/${firebase.user.uid}/${data[0]}`);
                    toast('Copied to clipboard',{duration:3000})
                    }
                return(<div key={key} className="p-2 my-2 bg-indigo-300 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <p className="text-xl text-indigo-900 font-semibold">Public List - {key+1}</p>
                          <div className="flex text-xl gap-2">
                            <div className="p-1  rounded-full hover:cursor-pointer hover:bg-indigo-400 transition ease-in-out delay-300"><IoIosLink onClick={()=>copyToClip(data)}/></div>
                            <div className="p-1 rounded-full hover:cursor-pointer hover:bg-red-400 transition ease-in-out delay-300"><MdDelete onClick={()=>deletePublicList(data)}/></div>
                          </div>
                        </div>
                        <PublicListCard key={key} data={data[1]}/>
                      </div>)
              }):<p>No list exist</p>}
            </div>
            <div className="m-4 bg-indigo-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <p className="text-indigo-800 text-2xl font-semibold">Private List</p>
                <button onClick={createPrivateList} className="px-2 py-1 rounded-2xl bg-indigo-400 hover:bg-indigo-500 transition ease-in-out duration-300">New List</button>
              </div>
              {firebase.privateData ? Object.entries(firebase.privateData).map((data,key)=>{
                return(<div key={key} className="p-2 my-2 bg-indigo-300 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <p className="text-xl text-indigo-900 font-semibold">Private List - {key+1}</p>
                          <div className="text-xl p-1 rounded-full hover:cursor-pointer hover:bg-red-400 transition ease-in-out delay-300">
                            <MdDelete onClick={()=>deletePrivateList(data)}/>
                          </div>
                        </div>
                        <ListCard key={key} data={data[1]}/>
                      </div>)
              }):<p>No list exist</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home