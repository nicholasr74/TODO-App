import React from 'react';
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import (Routes, Route, useNavigate)
// import ReactDOM from 'react-dom/client';




function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Cannot Create Account, Try Again.");
    const navigate = useNavigate(); 

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);    
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        
        let credentials = {
            username: username,
            email: email,
            password: password,
        };

        console.log(JSON.stringify(credentials))

        try{
            const response = await fetch('https://todo-api-is14.onrender.com/signup', {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(credentials),
            });

            console.log(response);

            if(!response.ok){
                throw new Error("Invalid Credentials");
            }
            
            const reply = await response.json();
            console.log(reply); 

            
            if(reply.error != undefined){
                setErrorMessage(reply.error);
                setError(true);
            }
            else{
                navigate('/');
            }

        }catch (error){
            setError(true);
            console.error("Error making POST request: ", error); 
        }
        };


  


    return(
        <>
       
            <div className = "container my-10 m-auto w-5/6  bg-white rounded-lg drop-shadow-xl p-8 size-50">
                
                <form className = "flex flex-col items-start ">

                {error && 
                <div className = "mx-4 bg-red-300 px-4 py-2 border-red-500 rounded-xl">
                    {errorMessage}
                </div>

                }

                    <label>
                        <input
                            type = "text"
                            className = "focus: outline-none"
                            placeholder='Username'
                            value = {username}
                            onChange = {handleUsernameChange}
                        ></input>
                    </label>

                    <label>
                        <input
                            type = "text"
                            className = "focus: outline-none"
                            placeholder='Email'
                            value = {email}
                            onChange = {handleEmailChange}
                        ></input>
                    </label>

                    <label>
                        <input
                            type = "password"
                            className = "focus: outline-none"
                            placeholder='Password'
                            value = {password}
                            onChange = {handlePasswordChange}
                        ></input>
                    </label>

                    <button className = "bg-blue-400 rounded-md drop-shadow-sm text-white m-5 px-3 py-1" onClick = {handleSignup}>Submit</button>
                </form>



            </div>
        </>
    )
}


export default Signup;