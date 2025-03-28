import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"

function Homepage() {
    const [email, setEmail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        if (email === "abc@gmail.com" && userpassword === "123456") {
            alert("Login Successfully");
        }
        else {
            alert("User Invalid");
        };
    };
    
    const handleAction = (e) => {
        navigate("/twobutton")
    }

    return (
        <div className="homepage">

            <h1>Login Page</h1>
            <form onSubmit={handleChange}>
                <label>
                    <input placeholder="Enter the Username" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Enter the Password" value={userpassword} type="password" onChange={(e) => setuserpassword(e.target.value)} />


                </label>
                <button type="Submit" onClick={handleAction}>Login</button>
            </form>

        </div>
    );
};
export default Homepage;