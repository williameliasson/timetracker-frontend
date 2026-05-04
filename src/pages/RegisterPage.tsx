import React, { useState } from 'react'
import { API_URL } from '../config'
type FormData = {
    username: string,
    password: string,
}

const emptyForm: FormData = {username: "", password: ""}

function RegisterPage() {

    const [formData, setFormData] = useState(emptyForm);

    function handleRegisterClick(){
        fetch(API_URL + "/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            }
        )
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        let name = e.target.name;
        let value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(formData);
    
    }
  return (
    <div>
        <h1>Register</h1>
        <label htmlFor="username">Choose username: </label>
        <input type="text" name="username" id="username" onChange={handleChange} value={formData.username}/>
        <br />
        <label htmlFor="password">Choose password: </label>
        <input type="password" name="password" id="password" onChange={handleChange} value={formData.password}/>
        <br />
        <button onClick={handleRegisterClick}>Register</button>
    </div>
  )
}

export default RegisterPage