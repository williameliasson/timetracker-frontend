import React from 'react'

function LoginPage() {

    function handleLoginClick(){
        
    }
    
  return (
    <div>
        <h1>Login</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <br />
        <button onClick={handleLoginClick}>Log in</button>
    </div>
  )
}

export default LoginPage