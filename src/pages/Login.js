import React from 'react';
import './Login.css'
import { useState } from 'react';
// import ReactDOM from 'react-dom/client';




function Login({signup}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const {signupStatus} = signup.state || {};

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);    
    };

    

    const handleLogin = async (e) => {
        e.preventDefault();
        
        let credentials = {
            username: username,
            password: password,
        };

        console.log(JSON.stringify(credentials))

        try{
            const response = await fetch('https://todo-api-is14.onrender.com/login', {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(credentials),
            });

            console.log(response);

            if(!response.ok){
                throw new Error("Invalid Credentials");
            }
            
            const accToken = await response.json();
            console.log(accToken.access_token);
            setAccessToken(accToken.access_token);
            // Save access token to localStorage
            localStorage.setItem('accessToken', accToken.access_token);
            window.location.href = "/todo";
            
        }catch (error){
            
            console.error("Error making POST request: ", error); 
        }
        };


  


    return(
        <>
       
            <div className = "container my-10 m-auto w-5/6  bg-white rounded-lg drop-shadow-xl p-8 size-50">
                <form className = "flex flex-col items-start ">
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
                            type = "password"
                            className = "focus: outline-none"
                            placeholder='Password'
                            value = {password}
                            onChange = {handlePasswordChange}
                        ></input>
                    </label>

                    <button className = "bg-blue-400 rounded-md drop-shadow-sm text-white m-5 px-3 py-1" onClick = {handleLogin}>Submit</button>
                </form>



            </div>
        </>
    )
}


export default Login;