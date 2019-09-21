import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from "shards-react"
import ReactQuill from "react-quill";
import './modal.css'
export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false,name: '',team :'' ,country: ''};

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
        <Button theme="accent" onClick={this.toggle}>Detail</Button>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Reclamation</ModalHeader>
           
          <ModalBody>
        
        
          <div className="row">
            <div className="form-group col-md-4">
            <label>Description:</label>
             </div>
                <span>
                   
                    <ReactQuill className="editorText" id="description" value={this.props.data}  onChange={e => this.setState({ description: e })} />
                </span>
              </div>
            
          </ModalBody>
          <ModalFooter>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
         
          </form>
        </Modal>
        </div>
       
        
      
    );
  }
}
