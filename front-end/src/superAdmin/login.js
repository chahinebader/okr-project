import React, { Component, Fragment } from 'react';
import "../style/loginStyle.css";
import CryptoJS from 'crypto-js';
import './style/AdminLTE.css';


class loginPage extends Component {
  constructor(props) {
    super(props);
   
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
          loginSuperAdmin(email: "${email}", password: "${password}") {
            _id
            token
            tokenExpiration
            name
            avatar
            status 
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
         
         }
         return res.json();
       })
       .then(resData => {
      
         if (resData.data.loginSuperAdmin.token) {
           localStorage.setItem("userId",resData.data.loginSuperAdmin._id);
           localStorage.setItem("tokenAuth",resData.data.loginSuperAdmin.token);
           localStorage.setItem("name",resData.data.loginSuperAdmin.name);
           localStorage.setItem("avatar",resData.data.loginSuperAdmin.avatar);
           localStorage.setItem("status", CryptoJS.AES.encrypt(resData.data.loginSuperAdmin.status, 'secret key 123'));
           window.location.reload();
           
 
         }
 
       }).catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
        <Fragment>
       <body class="hold-transition login-page">
        <div class="login-box">
         <div class="login-logo">
           <b>Admin</b><span className="LTE">OKR</span>
            </div>

          <div class="login-box-body">
           <p class="login-box-msg">Sign in to start your session</p>

           <form onSubmit={this.submitHandler}>
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email"  ref={this.emailEl} required/>
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" ref={this.passwordEl} required/>
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
       
      
       
          <button type="submit" class="btn btn-primary btn-admin ">Sign In</button>
     
     
      </div>
    </form>

   

  

  </div>

</div>



</body>
        </Fragment>
    );
  }
}

export default loginPage;
