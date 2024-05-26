/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect} from "react"
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import { getDatabase,set,ref,onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBzVKF0JcPlPv2ktD0M5CyBZXImOmYK3A0",
    authDomain: "movie-library-web.firebaseapp.com",
    projectId: "movie-library-web",
    storageBucket: "movie-library-web.appspot.com",
    messagingSenderId: "702449085614",
    appId: "1:702449085614:web:d0bd0c41ae4ad4983a513f",
    databaseURL:"https://movie-library-web-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp)
const FirebaseContext=createContext(null)
const database=getDatabase(firebaseApp)
export const useFirebase = ()=> useContext(FirebaseContext)

export const FirebaseProvider=(props)=>{
    const [privateData,setPrivateData]=useState(null)
    const [publicData,setPublicData]=useState(null)
    const [isLoaded, setIsloaded] = useState(false);
    const [user,setUser]=useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user=>{
            setIsloaded(true);
            setUser(user ? user : null)
        })
    },[])
    const signupUserWithEmailAndPassword=(email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password).then((val)=>console.log(val)).catch((err)=>console.log(err))
    }
    const signinUserWithEmailAndPassword=(email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password).then((val)=>console.log(val)).catch((err)=>console.log(err))
      }
    const putData=(key,data)=>set(ref(database,key),data)

    
      useEffect(()=>{
        onValue(ref(database,`${user?.uid}/private`),(snapshot)=>setPrivateData(snapshot.val()))
        onValue(ref(database,`${user?.uid}/public`),(snapshot)=>setPublicData(snapshot.val()))
      },[user])

    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signinUserWithEmailAndPassword,user,putData,isLoaded,privateData,publicData}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}