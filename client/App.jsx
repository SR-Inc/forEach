import React, { Component } from 'react';
import Login from './components/Login';
import Donation from './components/Donation';
import Signup from './components/Signup';

import DemoMap from "./map/components/DemoMap";
import 'leaflet/dist/leaflet.css';
import './styles.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';


class App extends Component{
    constructor(props) {
      super(props);
      this.state = {
        credit_card : '', 
         phone_num: '',
        amount: '',
        user_id: null,
        user_name: '',
        user_donations: [],
        username: '',
        password: '',
        totalRaised: 0
      
      };
    this.editState = this.editState.bind(this);
    this.postToDB = this.postToDB.bind(this);
    this.logInToDB = this.logInToDB.bind(this);
    this.editUserSignup = this.editUserSignup.bind(this);
    }

  // Changing the value of state to the value of input of donation form
  editState(event){
    // console.log(event.target);
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
    // this.setState({...this.state, [event.target.id]: event.target.value})
  };
  // post request to update user info

  postToDB(){
    const donationObj = 
    {
      user_id: this.state.user_id,
      username: this.state.user_name,
      amount: parseInt(this.state.amount),
      credit_card: this.state.credit_card,
    };
    
    fetch('/donation', {
      method: 'POST', // or 'PUT'
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(donationObj),
    })
      .then(response => response.json())
      .then(res => {    
        if (res.status === 'Success inserting donation row') {
          console.log('Success:', res);
          this.setState({
            ...this.state,
            user_donations: res.userHistory,
            credit_card : '', 
            amount: '',
          })
        } 
     })
      .catch((error) => {
       console.error('Error posting a donation request:', error);
      });

    // clear the donation amount & creditcard input field
    document.getElementById('amount').value = '';
    document.getElementById('credit_card').value = '';

  };


  // post request to verify user login
  logInToDB(){
    const userObj = 
    {
      username: this.state.username,
      password: this.state.password
    };
 
    fetch('/user/login', {
        method: 'POST', // or 'PUT'
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userObj),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success logging in!'){
          console.log('Logged in user: ', data.userInfo );
          const user = data.userInfo;
          this.setState({
            ...this.state,
            user_name: user.username,
            user_id:   user._id,
            user_donations: data.userHistory,
            username : '', 
            password: ''
          })        
        }
      })
      .catch((error) => {
      console.error('Error fetching login:', error);
      });
  };

  editUserSignup (user) {
    this.setState({
      ...this.state,
      user_name: user.username,
      user_id: user._id,
      });    
  }

  componentDidMount() {
    fetch('/donation/total', {
      method: 'GET', 
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'Success getting total donations'){
        console.log('Collected: ', data.donation );
        const user = data;
        this.setState({
          ...this.state,
          totalRaised: data.donations
        })        
      }
    })
  }
 
  // componentDidMount for Total Raised $ fetch request


      render() {
        return (
          <Router>

            <div>
              <div className="main">
                  <h1>Codesmith Alumni Scholarship</h1>
                  <p>info about scholarship info about scholarship info about scholarship info about scholarship info about scholarship info about scholarship</p>   
                  <h3 id="totalHomePage">Total Raised ${this.state.totalRaised}</h3>
              </div>
              
              <DemoMap/>

              <Switch>
                <Route
                  exact path= "/"
                  render = {props => <Login {...props}  state = {this.state} editLogin = {this.editState} logInToDB = {this.logInToDB}/>}
                />
                <Route
                  exact path= "/donation"
                  render = {props => <Donation {...props}  onDonate = {this.editState} postToDB = {this.postToDB}  state = {this.state} />  }
                /> 
                <Route
                  exact path= "/signup"
                  render = {props => <Signup {...props}  editUserSignup = {this.editUserSignup}  state = {this.state} />}
                /> 
              </Switch>
            </div>
          </Router>
          
        )
      };
    }


    
  
export default App;


