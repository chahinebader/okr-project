/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { TextArea } from 'semantic-ui-react'
import axios from 'axios';



const loading = {
  margin: '1em',
  fontSize: '24px',
};



class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loadingUser: false,
      updated: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ loadingUser: true });

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      axios
        .get('http://localhost:4000/findUser', {
          params: {
            username: this.props.match.params.username,
          },
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then((response) => {
          this.setState({
            loadingUser: false,
            username: response.data.username,
            password: response.data.password,
            error: false,
          });
        })
        .catch((error) => {
          this.setState({
            loadingUser: false,
            error: true,
          });
        });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = (e) => {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      e.preventDefault();
      axios
        .put(
          'http://localhost:4000/updatePassword',
          {
            username: this.state.username,
            password: this.state.password,
          },
          {
            headers: { Authorization: `JWT ${accessString}` },
          },
        )
        .then((response) => {
          if (response.data.message === 'password updated') {
            this.setState({
              updated: true,
              error: false,
              loadingUser: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            updated: false,
            error: true,
            loadingUser: false,
          });
        });
    }
  };

  // eslint-disable-next-line consistent-return
  render() {
    const {
 username, password, updated, error, loadingUser 
} = this.state;

    if (error) {
      return (
        <div>
        
          <p style={loading}>
            There was a problem accessing your data. Please go login again.
          </p>
          <button  link="/login" >Go Login</button>
        </div>
      );
    }
    if (loadingUser !== false) {
      return (
        <div>
         
          <p style={loading}>Loading user data...</p>
        </div>
      );
    }
    if (loadingUser === false && updated === true) {
      return <Redirect to={`/userProfile/${username}`} />;
    }
    if (loadingUser === false) {
      return (
        <div>
         
          <form className="profile-form" onSubmit={this.updatePassword}>
            <TextArea
             
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              type="password"
            />
            <button>Save Changes</button>
          </form>
          <button link="/"> Go Home</button>
          <button link={`/userProfile/${username}`}>Cancel Changes</button>
        </div>
      );
    }
  }
}

UpdatePassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default UpdatePassword;
