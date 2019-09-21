import React, { Component, Fragment } from 'react';
import AuthContext from '../context/auth-context';
import "../style/loginStyle.css";
import CryptoJS from 'crypto-js';

import {NavLink} from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class loginPage extends Component {
 

  static contextType = AuthContext;
 
  constructor(props) {
    super(props);
    this.state={
      visible: false
    }
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef(); 
   
  }
  

  

  submitHandler = event => {
    
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    console.log(password +"   and mail is :    "+ email);
     if (email.trim().length === 0 || password.trim().length === 0) {
       return;
     }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            _id
            token
            tokenExpiration
            name
            avatar
            status
            company
          }
        }
      `
    };
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
         //return  <div className="error-message">Oops! Something went wrong!</div> 
       // stateError = true;
       this.setState({ visible: true});
         throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
     
        if (resData.data.login.token) {
          localStorage.setItem("userId",resData.data.login._id);
          localStorage.setItem("tokenAuth",resData.data.login.token);
          localStorage.setItem("name",resData.data.login.name);
          localStorage.setItem("avatar",resData.data.login.avatar);
          localStorage.setItem("company",resData.data.login.company);
          localStorage.setItem("status", CryptoJS.AES.encrypt(resData.data.login.status, 'secret key 123'));
          window.location.reload();
          

        }

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <Fragment>
         <div className="sidenav">
          <NavLink to="/"><Button className='btn-yellow'><i className="lni-shift-left"></i>Back</Button></NavLink>
         <div className="login-main-text">
           <img src={require('../images/satoripop.png')} alt='logo' className="logo"/>
            <h2>OKR Plateforme<br/> Login Page</h2>
            <p>Login from here to access.</p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form  onSubmit={this.submitHandler}>
                  <div className="form-group">
                     <label>Email Address</label>
                     <input  className="form-control"type="email" id="email" ref={this.emailEl} aria-describedby="emailHelp" placeholder="Enter email"  required/>
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input  className="form-control"  minlength="4" type="password" id="password" ref={this.passwordEl} placeholder="Password" required />
                  </div>
                  <button type="submit" className="btn btn-black">Login</button>
                   <NavLink className="ForgetPassword" to="/forgetpassword">Forget Password >>></NavLink> 
               </form>
            </div>

           {this.state.visible &&(
             
               <div className="text-danger">The Email Address or Password you Entered is Not Valid!  </div>
               )}
         </div>
      </div>
      </Fragment>
    );
  }
}

export default loginPage;
