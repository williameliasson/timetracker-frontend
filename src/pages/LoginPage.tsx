import { useState } from "react";
import { API_URL, EMPTY_FORM } from "../config";
import type { FormData } from "../config";

function LoginPage() {

    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    function handleLoginClick(){
        // src https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
        fetch(API_URL + "/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData),
                credentials: "include"
            }
        ).then(res => {
            if (res.ok) {
                window.location.href = "/";
            }
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
            let name = e.target.name;
            let value = e.target.value;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    
  return (
    <div>
        <h1>Login</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" onChange={handleChange} value={formData.username}/>
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" onChange={handleChange} value={formData.password}/>
        <br />
        <button onClick={handleLoginClick}>Log in</button>
    </div>
  )
}

export default LoginPage