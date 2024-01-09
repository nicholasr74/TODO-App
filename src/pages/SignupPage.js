import React from "react";
import Signup from './Signup.js'
import { NavLink } from 'react-router-dom';


function SignupPage(){

    return(
        <>
        <div className = "h-screen bg-gray-200">
            <div className = "flex flex-1 p-5 bg-blue-400 items-center justify-center text-white drop-shadow-md">
                <p className = "flex flex-1 justify-center text-4xl">Sign Up</p>    
                
                <NavLink to = "/login" as = "button" className = "flex flex-10 bg-blue  rounded text-l">
                   Log In
                </NavLink> 
                </div>
            <Signup/>
            </div>
        </>
    )
}


export default SignupPage;