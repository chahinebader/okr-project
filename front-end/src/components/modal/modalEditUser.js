import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Form,FormGroup,FormInput,FormSelect,FormCheckbox } from "shards-react";
import './modal.css'
import { Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';


const STAR_Mutation = gql`
mutation ToDo($name: String!, $email: String!, $status:String!,$avatar: String!,$expired: Boolean!){
  updateUser(userInput:{name:$name,email:$email,status:$status,avatar:$avatar,expired:$expired}){
    _id
  }
}
`;



class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    
   
 
      this.state = { 
        modal: false,
        name:  this.props.data.name,
        expired: this.props.data.expired==="true",
        avatar:  this.props.data.img,
        email:  this.props.data.email,
        status: this.props.data.status,
      
        

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
       
        <Button  className="editUser" outline onClick={this.toggle}> <Icon name='edit' className="icon" /> </Button>
        <Modal isOpen={this.state.modal}>
        <Mutation mutation={STAR_Mutation} pollInterval={1000}>
           {postMutation =>(
          <Form onSubmit={e => {
            e.preventDefault();
           
            if(this.state.name.length!== 0 && this.state.email.length!==0 ){
            
              postMutation({variables:{name: this.state.name, email: this.state.email, avatar: this.state.avatar, status:this.state.status, expired:this.state.expired }});
             this.setState({modal:false});
            }
          }}>
          <ModalHeader>{this.props.data.avatar} Edit User   </ModalHeader>
         
          <ModalBody>
      <FormGroup>
        <label htmlFor="#username">Full Name </label>
        <FormInput id="#username" value={this.state.name} placeholder="Full Name" onChange={(e)=> this.setState({name:e.target.value})}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Email *</label>
        <FormInput id="#username" value={this.state.email} placeholder="Email" onChange={(e)=> this.setState({email:e.target.value})}/>
      </FormGroup>
      <FormGroup>
       
      
        <FormCheckbox
        toggle
        checked={this.state.expired}
        onChange={(e) => this.setState({expired : !this.state.expired})}>
         Expired
      </FormCheckbox>
      </FormGroup>
      
      <label htmlFor="#password">Role *</label>
      <FormSelect value={this.state.status} onChange={(e) => this.setState({status: e.target.value})}>
      
      <option value="membre" >Membre</option>
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