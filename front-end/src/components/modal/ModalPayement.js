import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Form,FormGroup,FormInput,FormSelect } from "shards-react"
import './modal.css'
import { Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { WithContext as ReactTags } from 'react-tag-input';
import { Message } from 'semantic-ui-react'
import './Payement.css';

class ModalComponent extends React.Component {
  constructor(props){
   super(props)
   console.log('hello');
    this.state = { 
        modal: false
        
    };
}
  toggle() {
      console.log("clicked !!!!");
    this.setState({
      modal: !this.state.modal
    });
  }
 

  render() {
   
    return (
      
       <div>       
       <button className="btn-landing btn-landing-common" onClick={()=>this.toggle()}>Get It</button>
        <Modal isOpen={this.state.modal}>
       
        
          <ModalHeader>Buying Service</ModalHeader>
         
          <ModalBody>
          <form action="/charge" method="post" id="payment-form">
  <div class="form-row">
    <label for="card-element">
      Credit or debit card
    </label>
    <div id="card-element">
     
    </div>

  
    <div id="card-errors" role="alert"></div>
  </div>

  <button>Submit Payment</button>
</form>
          </ModalBody>
          <ModalFooter>
           <Button  theme="accent" type="submit">Submit</Button>
            <Button theme="danger" onClick={()=>this.toggle()}>Cancel</Button>
          </ModalFooter>
         
        
        
         
        </Modal>
        </div>
       
        
      
    );
  }
}
export default ModalComponent;