import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import { Message } from 'semantic-ui-react'
import axios from 'axios';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
const requestMutation =gql`
 mutation setData(
  $id:String!,
  $passwordCurrent:String,
  $passwordNew:String,
  $avatar:String){
  updateProfil(userProfil:{
    id: $id ,
    avatar: $avatar,
     passwordCurrent: $passwordCurrent,
     passwordNew: $passwordNew
    })
    {
    _id
    }
}
`;
const BASE_URL = 'http://localhost:4000/';
class UserAccountDetails extends React.Component{
  constructor(props){
    super(props);
  
   this.state={
     name: this.props.data.name,
     email: this.props.data.email,
     status: this.props.data.status,
     avatar: this.props.data.avatar,
     passwordCurrent:"",
     passwordNew:"",
     images: null ,
     imageUrls: null,
     valide: false,
     message: '',
     invalideRequired:false
   }
  }
 
  selectFiles = (event) => {
    let images = null ;
     images = event.target.files.item(0);
     if (images.name.match(/\.(jpg|jpeg|png|gif)$/)){
      let message = ` one valid image selected`
      this.setState({ images, message })
     }
  }

  uploadImages = () => {
      const uploaders = this.state.images
      const data = new FormData();
      data.append("image", uploaders, uploaders.name);
      console.log("image ==>"+data);
      return axios.post(BASE_URL + 'upload', data);
       // Once all the files are uploaded 
      // axios.all(uploaders).catch(err => alert(err.message));
    }
 

  render(){
    return(
      
      <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Account Details</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Mutation mutation={requestMutation}>
            {postMutation =>(
              <Form onSubmit={e => {
                e.preventDefault();
                if((this.state.passwordCurrent.length >= 5 || this.state.passwordNew.length >= 5) && (this.state.message.length===0)){
                  postMutation({variables:{
                    id: localStorage.getItem('userId'),
                    passwordCurrent: this.state.passwordCurrent, 
                    passwordNew: this.state.passwordNew
                    }});
                    this.setState({passwordCurrent:""});
                    this.setState({passwordNew:""});
                    this.setState({valide: true});
                }else if((this.state.passwordCurrent.length >= 5 || this.state.passwordNew.length >= 5) && (this.state.message.length!==0)){
                  var res = this.uploadImages();
                  res.then(function(response){
                  localStorage.setItem("avatar",response.data.imageUrl);
                  postMutation({variables:{
                    id: localStorage.getItem('userId'),
                    passwordCurrent: this.state.passwordCurrent, 
                    passwordNew: this.state.passwordNew,
                    avatar:  response.data.imageUrl
                    }});
                    this.setState({passwordCurrent:""});
                    this.setState({passwordNew:""});
                    this.setState({valide: true});
                }).catch(
                  err => console.log(err)
                )}
                else if(this.state.message.length !== 0){
                this.uploadImages().then(function(response){
                localStorage.setItem("avatar",response.data.imageUrl);
                postMutation({variables:{
                  id: localStorage.getItem('userId'),
                  avatar: response.data.imageUrl
                }});
                }).catch(
                  err => console.log(err)
                ) }
                else{
                  this.setState({invalideRequired: true});
                
                }
                }}>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Full Name</label>
                    <FormInput
                     className="inputText"
                     valid
                      id="feFirstName"
                      placeholder="First Name"
                      value={this.state.name}
                      onChange={() => {}}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                     className="inputText"
                      valid
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={() => {}}
                      autoComplete="email"
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                 
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">Current Password</label>
                    <FormInput
                      type="password"
                      id="fePasswordC"
                      className="inputText"
                      value={this.state.passwordCurrent}
                      placeholder="Current Password"
                      onChange={(e) => {this.setState({passwordCurrent:e.target.value})}}
                      autoComplete="current-password"
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">New Password</label>
                    <FormInput
                      type="password"
                      id="fePasswordN"
                      placeholder=" New Password"
                      value={this.state.passwordNew}
                      className="inputText"
                      onChange={(e) => {this.setState({passwordNew:e.target.value})}}
                      autoComplete="current-password"
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Role</label>
                  <FormInput
                   className="inputText"
                    valid
                    id="feAddress"
                    placeholder="Address"
                    value={this.state.status}
                    onChange={() => {}}
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                  <div>
	        	<br/>
	        
            <label htmlFor="feAddress">Avatar</label>
	        
		        		<input className="form-control " type="file" onChange={this.selectFiles}/>
		        
		        	{ this.state.message? <p className="text-info">{this.state.message}</p>: ''}
		        
		        
		    </div>
                  </Col>
                </Row>
               
                <Button pill theme="accent" type="submit">Update Account</Button>
                {this.state.invalideRequired &&
                <div className="text-danger">
                  Invalid Fields !
                </div>
                }
               {this.state.valide &&( <Message success header='Successful Update' content="your profile has been updated successfully !" />)}
              </Form>
               )} 
              </Mutation>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
    );
  }

}


UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails ;
