import React from "react";
import Login from './Login.js'
import Signup from './Signup.js'
import { NavLink } from 'react-router-dom';


function LoginPage(){

    return(
        <>
        <div className = "h-screen bg-gray-200">
            <div className = "flex flex-1 p-5 bg-blue-400 items-center justify-center text-white drop-shadow-md">
                <p className = "flex flex-1 justify-center text-4xl">Login</p>    
                
                <NavLink to = "/signup" as = "button" className = "flex flex-10 bg-blue  rounded text-l">
                   Sign Up
                </NavLink> 
                </div>
            <Login/>
            </div>
        </>
    )
}


export default LoginPage;