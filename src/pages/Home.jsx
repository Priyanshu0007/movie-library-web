import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard";

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
  useEffect(()=>{console.log(data);},[data])
  return (
    <div className="w-[80%] flex flex-col ">
      <Navbar/>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-4xl py-4 text-green-800 w-[75%] px-8">Search</p>
        <input value={search} onInput={e => setSearch(e.target.value)} type="text" className="h-14 w-[70%] pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="type 3 char atleast..."></input>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-[100%] lg:w-[65%] grid gap-8 grid-cols-1 md:grid-cols-2 pt-4">
            {!data && <p className="text-white">No Results Found</p>}
            {data?.map((mo)=>{
              return(<MovieCard key={mo.imdbId} title={mo.Title} year={mo.Year} img={mo.Poster} type={mo.Type}/>)
            })}
          </div>
          <div className="w-[100%] lg:w-[35%] pt-4">
            <div className="m-4 bg-green-100 p-4 rounded-xl">
              <p className="text-green-800 text-2xl font-semibold">Public List</p>
              
            </div>
            <div className="m-4 bg-green-100 p-4 rounded-xl">
              <p className="text-green-800 text-2xl font-semibold">Private List</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home