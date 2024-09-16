import React, { Component } from 'react';
import '../styles.css';
import { Link, Redirect } from "react-router-dom";

const Login = (props) => {
    if (props.state.user_id !== null) {
      return <Redirect to = '/donation'/>;
    }
    
    return (
    <div>
      <h1 id="LoginH1">Login</h1>
      <div className = "form">

          <label>Username:</label>
          <input type="text" id="username" onChange={props.editLogin}/>
           
          <label>Password:</label>
          <input type="password" id="password" onChange={props.editLogin}/>
            
          <button onClick={props.logInToDB}>Login</button>
          <button>Sign in with Google</button>
          <Link to="/signup">
            <button type="button">Register An Account</button>
          </Link>

      </div>
    
    </div>
    );

}


export default Login;