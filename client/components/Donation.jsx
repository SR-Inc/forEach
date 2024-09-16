import React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import '../styles/styles.css';


const Donation = (props) =>  {
    // calculate the individual total
    // console.log('User donations >>> ', props.state.user_donations);
    let userTotalDonation = props.state.user_donations.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
    return (
      <div>      

        <h1>Individual Donation: ${userTotalDonation} </h1>
      
        <div className = "form">

          <label>Donation Amount:</label>
          <input type="text" id="amount" onChange={props.onDonate}/>
        
          <label>Credit Card:</label>
          <input type="text" id="credit_card" onChange={props.onDonate}/>
          
            
          <button onClick={props.postToDB}>Submit</button>

        </div>
      </div>
    )
};

export default Donation