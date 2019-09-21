/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import "../style/loginStyle.css";
import axios from 'axios';
import { Message } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


class ForgotPassword extends Component {
  constructor() {
    super();
   
    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (e) => {
    e.preventDefault();
  
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
       axios.post('http://localhost:4000/forgotPassword', {email})
        .then(response => {
        if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        })
        .catch((error) => {
          console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
              showNullError: false,
            });
          }
        });
    }
  };

  render() {
    const {email, messageFromServer, showNullError, showError } = this.state;

    return (
      <Fragment>
      <div className="sidenav">
               <div className="login-main-text">
                 <img src={require('../images/satoripop.png')} alt="logo" className="logo"/>
                  <h2>OKR Plateforme<br/> Forget Password Page</h2>
                  <p>Reset Password from here.</p>
               </div>
            </div>
            <div className="main">
               <div className="col-md-6 col-sm-12">
                  <div className="login-form">
                     <form  onSubmit={this.sendEmail}>
                        <div className="form-group">
                           <label>Email Address</label>
                           <input  className="form-control"type="email" value={email} onChange={this.handleChange('email')} id="email" ref={this.emailEl} aria-describedby="emailHelp" placeholder="Enter email"  required/>
                        </div>
                        
                        <button type="submit" className="btn btn-black">Reset</button>
                        <NavLink to="/auth"> <button type="button" className="btn btn-black">Login</button></NavLink>
                     </form>
                  </div>
                  {showNullError && (
          <div>
           
            <Message negative header='Failed Send' content=" The email address cannot be null! " />
          </div>
        )}
        {showError && (
          <div>
             <Message negative header='Failed Send' content=" That email address isn&apos;t recognized. Please try again or
              register for a new account. " />
            
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <Message success header='Successful Send' content="Password Reset Email Successfully Sent! " />
            
          </div>
        )}
               
               </div>
            </div>
            </Fragment> 
    );
  }
}

export default ForgotPassword;
