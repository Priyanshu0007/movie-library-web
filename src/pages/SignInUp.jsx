import { useState,useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router";
const SignInUp = () => {
  const [inEmail,setInEmail]=useState('');
  const [upEmail,setUpEmail]=useState('');
  const [inPass,setInPass]=useState("");
  const [upPass,setUpPass]=useState("");
  const firebase = useFirebase()
  const nagivate=useNavigate()

  useEffect(()=>{
    if(!firebase.user?.email){nagivate('/sign')}
    else{nagivate('/')}
  },[firebase,nagivate])
  return (
    <div className="flex w-[80%] md:w-[40%] h-screen items-center">
      {firebase.isLoaded ? <div className="bg-green-200 w-full py-4 rounded-3xl shadow-2xl shadow-green-300">
        <div className="text-9xl flex justify-center">
          <FaUserCircle />
        </div>
        <div>
            <p className="text-2xl px-8">Sign Up</p>
            <div className="space-y-6 px-8 py-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input value={upEmail} onInput={e => setUpEmail(e.target.value)} autoComplete="email" id="upemail" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 pl-1 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="mt-2">
                  <input id="uppassword"  value={upPass} autoComplete="current-password"  onInput={e => setUpPass(e.target.value)} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none pl-1 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <button onClick={()=>firebase.signupUserWithEmailAndPassword(upEmail,upPass)} type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign up</button>
              </div>
            </div>
        </div>
        <div className="flex mx-6 items-center gap-2">
          <div className=" border-b-2 w-full border-gray-500"></div>
          <div className="text-gray-500 font-semibold">OR</div>
          <div className=" border-b-2 w-full border-gray-500"></div>
        </div>
        <div>
          <p className="text-2xl px-8">Sign In</p>
            <div className="space-y-6 px-8 py-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="inemail" name="email" type="email" autoComplete="email" value={inEmail} onInput={e => setInEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none pl-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="mt-2">
                  <input id="inpassword" value={inPass} autoComplete="current-password" onInput={e => setInPass(e.target.value)} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none pl-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <button onClick={()=>firebase.signinUserWithEmailAndPassword(inEmail,inPass)} type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
              </div>
            </div>
        </div>
      </div>: <p className="text-5xl mx-auto">Loading...</p>}
    </div>
  )
}

export default SignInUp