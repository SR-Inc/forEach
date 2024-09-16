import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";

function Signup(props){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_num, setPhone_num] = useState('');

  function submitSignup(){
    const data = {username, password, firstname, lastname, email, phone_num};

    fetch('/user', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
      // of success, expect a user object back and will pass this to props.editUserSignup
      if (res.status === 'Success creating user row'){
        console.log('Success:', res.insertedRow);
        props.editUserSignup(res.insertedRow);
      }
    })
    .catch((error) => {
      console.error('Error creating user: ', error);
    });
    }

    if (props.state.user_id !== null) {
      return <Redirect to = '/donation'/>;
    }

    return (
      <div className = "form">
      <h1>Sign Up: </h1>
      <label>Username:</label>
      <input type="text" id="username" onChange = {(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="text" id="password" onChange = {(e) => setPassword(e.target.value)} />
      <label>First Name:</label>
      <input type="text" id="firstName" onChange = {(e) => setFirstname(e.target.value)}/>
      <label>Last Name:</label>
      <input type="text" id="lastName" onChange = {(e) => setLastname(e.target.value)}/>
      <label>Email:</label>
      <input type="text" id="email" onChange = {(e) => setEmail(e.target.value)}/>
      <label>Phone Number:</label>
      <input type="text" id="phone_num" onChange = {(e) => setPhone_num(e.target.val)}/>
      <button onClick = {submitSignup}>Submit</button>
      </div>
    )
  
};

export default Signup;



