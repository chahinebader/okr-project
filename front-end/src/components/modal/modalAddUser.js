import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Form,FormGroup,FormInput,FormSelect } from "shards-react"
import './modal.css'
import { Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';


const STAR_Mutation = gql`
mutation ToDo($name: String!, $email: String!, $status:String! , $password:String!,$avatar: String!){
    createUser(userInput:{name:$name ,email: $email,status: $status,password:$password,avatar: $avatar,company:"${localStorage.getItem('company')}"}){
        _id
      }
}
`;



class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    
   
 
      this.state = { 
        modal: false,
        name: null,
        password:null,
        passwordR:null,
        avatar: "default.png",
        email: null,
        status:"membre"

      }  
  
    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeTeam(event) {
    this.setState({team: event.target.value});
  }
  handleChangeCountry(event) {
    this.setState({country: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
     }
  
   
  render() {
    
    return (
      
       <div>  
       
        <Button theme="accent" className="addUser" pill onClick={this.toggle}> <Icon name='add' className="icon" /> ADD User</Button>
        <Modal isOpen={this.state.modal}>
        <Mutation mutation={STAR_Mutation} pollInterval={1000}>
           {postMutation =>(
          <Form onSubmit={e => {
            e.preventDefault();
            if(this.state.name.length!== 0 && this.state.email.length!==0 && (this.state.password.toString()===this.state.passwordR.toString())){
          postMutation({variables:{name: this.state.name, email: this.state.email, avatar: this.state.avatar,password: this.state.password, status:this.state.status }});
          this.setState({modal:false});
            }
          }}>
          <ModalHeader>ADD New User</ModalHeader>
         
          <ModalBody>
        
      <FormGroup>
        <label htmlFor="#username">Full Name *</label>
        <FormInput id="#username" placeholder="Full Name" onChange={(e)=> this.setState({name:e.target.value})}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Email *</label>
        <FormInput id="#username" placeholder="Email" onChange={(e)=> this.setState({email:e.target.value})}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Password *</label>
        <FormInput id="#username" type="password" placeholder="Password" onChange={(e)=> this.setState({password:e.target.value})}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Repeat The Password *</label>
        <FormInput id="#username" type="password" placeholder="Repeat The Password" onChange={(e)=> this.setState({passwordR:e.target.value})}/>
      </FormGroup>
      <label htmlFor="#password">Role *</label>
      <FormSelect onChange={(e) => this.setState({status: e.target.value})}>
      
      <option value="membre">Membre</option>
      <option value="superviseur" >Superviseur</option>
      <option value="admin" >Admin</option>
     
     
    </FormSelect>
          </ModalBody>
          <ModalFooter>
           <Button  theme="accent" type="submit">Submit</Button>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
           )}
           </Mutation> 
         
        </Modal>
        </div>
       
        
      
    );
  }
}
export default ModalComponent;