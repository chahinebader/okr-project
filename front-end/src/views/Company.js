import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  FormSelect
} from "shards-react";
import gql from 'graphql-tag'
import { Message } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import '../style/companyPage.css';
const requestMutation =gql`
 mutation createCompany(
  $companyName:String!,
  $interval:String,
  $domain:String!,
  $name:String!,
  $email:String!,
  $password:String!,
  ){
    createCompany(companyInput: {companyName: $companyName, interval: $interval ,domain: $domain, name:$name,email:$email,password:$password})
  {
   companyName

  }
}
`;
class SuperAdmin extends React.Component{
  constructor(props){
    super(props);
  
   this.state={
     companyname: null,
     interval:null,
     domain:null,
     name:null,
     email:null,
     passwordCurrent:" ",
     passwordNew:" ",
     images: null ,
     imageUrls: null,
     message: '',
     invalideRequired:false
   }
  }
 
render(){
  return(
 <div className="payement-style">
 <div className="company-image">
    <Message success header='Successful buying' content={[
      'Your payment has been effectuated  successfully. \n',
      'please fill in the form related to your company\'s data.',
      ].join('')} />
    </div>    
 
  <Card small className="view-payement">
  <CardHeader className="border-bottom">
    <h6 className="m-0">Your company information</h6>
  </CardHeader>
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
        <Mutation mutation={requestMutation}>
            {createCompany =>(
          <form  onSubmit={e =>{
            e.preventDefault();
                   console.log("varaibles ======>"+JSON.stringify(this.state));          
                  createCompany({variables:{
                  companyName:this.state.companyname,
                  interval:this.state.interval,
                  domain:this.state.domain,
                  name:this.state.name,
                  email:this.state.email,
                  password:this.state.passwordNew,
                  }}).then(res => {
                    console.log(res);

                  }
                    
                  );
           } }>
            <Row>
              <Col md="6" className="form-group">
                <label htmlFor="feFirstName">Company name</label>
                <FormInput
                 className="inputText"
                  id="feFirstName"
                  placeholder="First Name"
                  onChange={(e) => {this.setState({companyname:e.target.value})}}
                />
              </Col>
              <Col md="6" className="form-group">
               
              </Col>
            </Row>
            <Row>
              <Col md="4" className="form-group">
                <label htmlFor="fePassword">CEO-Name</label>
                <FormInput
                  type="text"
                  id="fePasswordC"
                  className="inputText"
                  placeholder="nom"
                  autoComplete="current-password"
                  onChange={(e) => {this.setState({name:e.target.value})}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="fePassword">CEO-Email</label>
                <FormInput
                  type="email"
                  id="fePasswordN"
                  placeholder=" Email"
                  className="inputText"
                  autoComplete="current-password"
                  onChange={(e) => {this.setState({email:e.target.value})}}
                />
              </Col>

            </Row>
            <Row>
              <Col md="4" className="form-group">
                <label htmlFor="fePassword">Password</label>
                <FormInput
                  type="password"
                  id="fePasswordC"
                  className="inputText"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => {this.setState({passwordNew:e.target.value})}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="fePassword">Reapeat Password</label>
                <FormInput
                  type="password"
                  id="fePasswordN"
                  placeholder=" Repeat Password"
                  className="inputText"
                  autoComplete="current-password"
                  onChange={(e) => {this.setState({passwordCurrent:e.target.value})}}
                />
              </Col>
            </Row>
            <Row>
              <Col md="2" className="form-group">
                <label htmlFor="fePassword">Number of members*</label>
                <FormSelect onChange={(e) => this.setState({interval: e.target.value})}>
                <option value="" disabled selected>Choose your option</option>
                <option value="5-20" >5-20</option>
                <option value="10-50">10-50</option>
                <option value="100-200">100-200</option>
                <option value="200-500">200-500</option>
                <option value="500++">plus 500</option>
                 </FormSelect>
              </Col>
              <Col md="2" className="form-group">
              <label htmlFor="feEmail">domaine*</label>
              <FormSelect  onChange={(e) => this.setState({domain: e.target.value})}>
              <option value="" disabled selected>Choose your option</option>
                <option value="Informatique">Informatique</option>
                <option value="Commercial">Commercial</option>
                <option value="Energie">Energie</option>
                <option value="Sante">Sante</option>
                <option value="Sport">Sport</option>
                <option value="Education">Education</option>
                <option value="Agricole">Agricole</option>
                <option value="Other">Other</option>
                 </FormSelect>
              </Col>
            
            </Row>
            <Button pill theme="accent" type="submit">Send</Button>
          </form>
            
          )} 
          </Mutation>
       
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
</Card>
 <div className="main-footer d-flex p-2 px-3 bg-white border-top">
<span className="copyright ml-auto my-auto mr-2">Copyright © 2019 Satoripop.com</span>
</div>
</div>  
)}
}
export default SuperAdmin;
