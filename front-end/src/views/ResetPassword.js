/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */

import React, { Component, Fragment } from 'react';
import "../style/loginStyle.css";
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import { Message } from 'semantic-ui-react'


const loading = {
  margin: '1em',
  fontSize: '24px',
};



export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    await axios
      .get('http://localhost:4000/reset', {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      })
      .then((response) => {
      
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            username: response.data.username,
            updated: false,
            isLoading: false,
            error: false,
          });
        }
      })
      .catch((error) => {
       
        this.setState({
          updated: false,
          isLoading: false,
          error: true,
        });
      });
  }

  handleChange = (event) => {
    this.setState({
      password: event.target.value,
    });
   
  };

  updatePassword = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:4000/updatePasswordViaEmail', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
       
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch((error) => {
      });
  };

  render() {
    const {
 error, isLoading, updated 
} = this.state;

if (isLoading) {
  return (
    <div>
    
      <div style={loading}>Loading User Data...</div>
    </div>
  );
}
if (error) {
    
  return (
    <div>
     
     <Message negative header='Problem resetting password' content=" Please send another reset link." />
       
     
    </div>
  );
}

return(
<Fragment>
<div className="sidenav">
         <div className="login-main-text">
           <img src={require('../images/satoripop.png')} alt='logo' className="logo"/>
            <h2>OKR Plateforme<br/> Reset Page</h2>
            <p>Reset from here.</p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form  onSubmit={this.updatePassword}>
                 
                  <div className="form-group">
                     <label>Password</label>
                     <input  className="form-control"  minlength="4" type="password" id="password"   onChange={e=>this.handleChange(e)}
                    placeholder="Password" required />
                  </div>
                  <button type="submit" className="btn btn-black">Reset password</button>
                  <NavLink  to="/auth"><button type="button" className="btn btn-black">Login</button></NavLink>
                 
               </form>
            </div>

            {updated && (
          <div>
             <Message success header='Successful Reset' content=" Your password has been successfully reset, please try logging in
              again." />
           
          </div>
        )}
         </div>
      </div>
      </Fragment>
);
}
}
ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
