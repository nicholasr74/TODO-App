import React from 'react';
import './Login.css'
// import ReactDOM from 'react-dom/client';




function Login(){

    return(
        <>
       
            <div className = "container m-auto bg-white rounded-lg drop-shadow-xl p-8 size-50">
                <form className = "flex flex-col items-start ">
                    <label>
                    <input
                    type = "text"
                    className = "focus: outline-none"
                    placeholder='Username'
                    ></input>
                    </label>
                    <label>
                     
                        <input
                            type = "text"
                            className = "focus: outline-none"
                            placeholder='Password'
                        ></input>
                    </label>
                </form>



            </div>
        </>
    )
}


export default Login;