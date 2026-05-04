import React, { useState } from 'react'
import { API_URL, EMPTY_FORM } from '../config'
import type { FormData } from '../config';

function RegisterPage() {

    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

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