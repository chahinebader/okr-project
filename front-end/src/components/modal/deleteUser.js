import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Form } from "shards-react"
import './modal.css'
import { Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';

const STAR_Mutation = gql`
mutation ToDo($id: ID!){
  deleteUser(id: $id){
    _id
  }
}
`;


class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    
   
 
      this.state = { modal: false }  ;
  
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
       
        <Button theme="danger" outline className="deleteUser"  onClick={this.toggle}> <Icon name='delete' /></Button>
        <Modal isOpen={this.state.modal}>
        <Mutation mutation={STAR_Mutation}>
           {postMutation =>(
          <Form onSubmit={e => {
          
            e.preventDefault();
            
            if(this.props.data.length!== 0 ){
          postMutation({variables:{id: this.props.data }});
          this.setState({modal:false});
            }
          }}>
          <ModalHeader>Alert</ModalHeader>
         
          <ModalBody>
            <span>Are You Sur To Delete This User !</span>
          </ModalBody>
          <ModalFooter>
           <Button  theme="accent" type="submit">Yes</Button>
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