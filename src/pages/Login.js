import React from 'react';
import ReactDOM from 'react-dom/client';



function Login(){

    return(
        <>
            <div className = "bg-white rounded-lg drop-shadow-xl p-8">
                <form className = "flex flex-col items-start">
                    <label className = "flex flex-col items-start">
                        Username
                    <input
                    type = "text"
                    placeholder='Username'
                    ></input>
                    </label>
                    <label>
                        Password
                        <input></input>
                    </label>
                </form>



            </div>
        </>
    )
}


export default Login;