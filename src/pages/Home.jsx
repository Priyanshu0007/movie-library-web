import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router";
import ListCard from "../components/ListCard";
import PublicListCard from "../components/PublicListCard";
import { IoIosLink } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [search,setSearch]=useState("");
  const [data,setData]=useState([]);
  useEffect(()=>{
    fetch("https://www.omdbapi.com/?apikey=29e1ccf2&s=abc").then(res=>res.json()).then(data=>{setData(data.Search)}).catch(err=>{console.log(err);})
  },[])
  useEffect(()=>{  
    if(search.length>2){
    setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&s=${search}`).then(res=>res.json()).then(data=>{console.log(data);setData(data.Search)}).catch(err=>{console.log(err);})
   }, 3000);
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
  }
  const createPublicList=()=>{
    var r = Math.floor(Math.random() * 16);
    firebase.putData(`${firebase.user.uid}/public/${r}`,{id:r});
  }
  const deletePublicList=(data)=>{

    firebase.putData(`${firebase.user.uid}/public/${data[0]}`,{id:null});
  }
  const deletePrivateList=(data)=>{

    firebase.putData(`${firebase.user.uid}/private/${data[0]}`,{id:null});
  }
  const [copySuccess, setCopySuccess] = useState(false)
  async function copyToClip(data) {
    await navigator.clipboard.writeText(`${location.href}public/${firebase.user.uid}/${data[0]}`);
    setCopySuccess(true);
    setTimeout(()=>{
      setCopySuccess(false);
    },5000)
}

  return (
    <div className="w-[90%] md:w-[80%] flex flex-col ">
      <Navbar/>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-4xl py-4 text-green-800 w-[75%] px-8">Search any movie</p>
        <input value={search} onInput={e => setSearch(e.target.value)} type="text" className="h-14 w-[70%] pr-8 pl-5 rounded z-0 focus:shadow-green-300 focus:shadow-2xl focus:outline-none" placeholder="Enter three char atleast..."></input>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-[100%] lg:w-[65%] grid gap-8 grid-cols-1 md:grid-cols-2 pt-4">
            {!data && <p className="text-green-600 text-center">No Results Found</p>}
            {data?.map((mo,id)=>{
              return(<MovieCard key={id} id={mo.imdbID} title={mo.Title} year={mo.Year} img={mo.Poster} type={mo.Type}/>)
            })}
          </div>
          <div className="w-[100%] lg:w-[35%] pt-4">
            <div className="m-4 bg-green-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <p className="text-green-800 text-2xl font-semibold">Public List</p>
                <button onClick={createPublicList} className="px-2 py-1 rounded-2xl bg-green-400">Create List</button>
              </div>
              {firebase.publicData ? Object.entries(firebase.publicData).map((data,key)=>{
                return(<div key={key} className="p-2 my-2 bg-green-300 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <p className="text-xl text-green-900 font-semibold">Public List - {key+1}</p>
                          <div className="flex text-xl gap-2">
                            {copySuccess && <p className="!text-sm">Copied</p>}
                            <IoIosLink onClick={()=>copyToClip(data)}/>
                            <MdDelete onClick={()=>deletePublicList(data)}/>
                          </div>
                        </div>
                        <PublicListCard key={key} data={data[1]}/>
                      </div>)
              }):<p>No list exist</p>}
            </div>
            <div className="m-4 bg-green-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <p className="text-green-800 text-2xl font-semibold">Private List</p>
                <button onClick={createPrivateList} className="px-2 py-1 rounded-2xl bg-green-400">Create List</button>
              </div>
              {firebase.privateData ? Object.entries(firebase.privateData).map((data,key)=>{
                return(<div key={key} className="p-2 my-2 bg-green-300 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <p className="text-xl text-green-900 font-semibold">Private List - {key+1}</p>
                          <div className="text-xl p-1">
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