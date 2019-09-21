import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,FormInput,Fade } from "shards-react"
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import './modalmission.css'

const ADD_MISSION = gql`
  mutation AddMission ($title: String!,$description: String!, $date_begin: String!,$date_end: String!,$userid: String!,$company: String!) {
      
    createMission(missionInput:{title: $title,description: $description,date_begin: $date_begin,date_end: $date_end,userid: $userid,company:$company}) {
        title
        description
    }
  }
`;
export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = { titlemission: '',startdate:'',endate:'',modal: false, level: 5,visibility: true};

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSlide(e) {

    this.setState({
      level: parseInt(e[0])
    });
    
  }
  handleChange() {
    this.setState({
      visibility: !this.state.visibility
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event) {
    event.preventDefault();
     }


  render() {
    let title;
    let description;
    let date_begin;
    let date_end;
    return (
              <Mutation mutation={ADD_MISSION}>
      {createMission => ( 
       <div>    
        <Button theme="accent" onClick={this.toggle} outline>+Create new mission</Button>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={e => {
              e.preventDefault();
              createMission({ variables: { title: this.state.titlemission, description: description.value,date_begin: date_begin.value,date_end:date_end.value,userid: localStorage.getItem("userId"),company: localStorage.getItem("company") } });    
              title.value = "";
              description.value = "";
              date_begin.value="";
              date_end.value="";
            }}>
          <ModalHeader>Add Mission</ModalHeader>
          <div id="wrapper">
          <div className="scrollbar" id="style-default">
          <div className="force-overflow"></div> 
          <ModalBody>           
          <div className="row">
            <div className="form-group col-md-4">
            <span>title: </span>
             </div>
                <span>                 
                    <FormInput type="text"  placeholder="" className="title-input" ref={node => {
                title = node;
              }} onChange={e => {
                this.setState({ titlemission: e.target.value })}} invalid = {this.state.titlemission.length < 6} valid = {this.state.titlemission.length >= 6}   />
                  
                </span>
                {this.state.titlemission.length < 6 && (
                              <Fade>
                              <p>title must be longer than 6 characters</p>
                              </Fade>
                            )} 
              </div>
              <div className="row">
                <span className="description-keyresult"> 
                <div className="description-label-keyresult">
            <span>description:</span>
             </div>                 
                    <input type="textarea" className="description-input-keyresult" ref={node => {
                description = node;
              }}   id="description"  />                  
                </span>
              </div>
              <div className="row">
                <div className="dates-field">
     
            <div className="date-label-keyresult">
            <span>start:</span>
             </div>
                <span className="span-date-begin">                  
                    <input type="date" className="date-input-keyresult"  ref={node => {
                date_begin = node; 
              }} onChange={e => {
                this.setState({ startdate: e.target.value })}}  id="description"  />                    
                </span>
           <div className="date-end-section">
            <div className="date-label-keyresult">
            <span>end:</span>
             </div>
                <span className="span-date-end">                  
                    <input type="date" className="date-input-keyresult" ref={node => {
                date_end = node;
              }} onChange={e => {
                this.setState({ endate: e.target.value })}}  id="description"  />                   
                </span>
                </div>
                </div>
                {this.state.startdate > this.state.enddate  && (
                              <Fade>
                              <p>start date of a mission must be before ending date</p>
                              </Fade>
                            )}
                            {console.log(this.state.startdate + this.state.endate)} 
              </div>                 
          </ModalBody>
          <ModalFooter>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
            <Button type="submit" theme="success" onClick={this.toggle}>Add Mission</Button>
          </ModalFooter>
          </div>
              </div>
          </form>
        </Modal>
        </div>
        )}
    </Mutation>    
    );
  }
}
