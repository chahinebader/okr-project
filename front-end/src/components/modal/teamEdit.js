import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Form,FormGroup,FormInput,FormSelect } from "shards-react"
import './modal.css'
import { Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { WithContext as ReactTags } from 'react-tag-input';
import { Message } from 'semantic-ui-react'

const STAR_Mutation = gql`
mutation ToDo($name: String!, $color: String!, $users:[String!]!, $id: String!){
    updateTeam(teamUpdate:{_id:$id,name:$name,color:$color, users:$users}){
      _id  
    }
}
`;

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
const delimiters = [KeyCodes.comma, KeyCodes.enter];
class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
   
    let objtag=[];
    for(const item of this.props.data.item.users){
   
         let index={
             id: item._id,
             text: item.name
         };
         objtag.push(index);
    }
    let obj=[];
    for(const item of this.props.data.users){
   
         let index={
             id: item._id,
             text: item.name
         };
         obj.push(index);
    }

      this.state = { 
        modal: false,
        name: this.props.data.item.teamName,
        color :this.props.data.item.color ,
        country: '',
        tags: objtag,
        suggestions: obj,
        failed: false,
        warring: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
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
     handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
       
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

  render() {
    const { tags, suggestions } = this.state;
    return (
      
       <div>       
        <Button outline onClick={this.toggle}> <Icon name='edit' /> Edit Team</Button>
        <Modal isOpen={this.state.modal}>
        <Mutation mutation={STAR_Mutation}>
           {postMutation =>(
          <Form onSubmit={e => {
            e.preventDefault();
            if(this.state.name.length===0 || this.state.tags.length===0){
              this.setState({failed: true});
              return;
            }
            var obj=[];
           for(const item of this.state.tags){
             if(obj.indexOf(item.id)!== -1){
              this.setState({warring: true});
              return;
             }
               obj.push(item.id);
           }
         
           postMutation({variables:{name: this.state.name, color: this.state.color, users: obj,id:this.props.data.item._id }});
           this.setState({modal:false});
          }}>
          <ModalHeader>Edit New Team</ModalHeader>
         
          <ModalBody>
        {this.state.failed && (
          <Message negative header='Failed Send' content="Please complete the following " />
        )}
         {this.state.warring && (
          <Message negative header='Duplicate User' content="User already added to this team " />
        )}
      <FormGroup>
        <label htmlFor="#username">Team Name</label>
        <FormInput id="#username" value={this.state.name} placeholder="Username" onChange={(e)=> this.setState({name:e.target.value})}/>
      </FormGroup>
       <label htmlFor="#password">Select Team Member</label>
     <div className="reactTagContainer">
       
        <ReactTags inline className="tag" tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
     </div>
      <label htmlFor="#password">Select Team Color (Optionnel)</label>
      <FormSelect  value={this.state.color} onChange={(e) => this.setState({color: e.target.value})}>
      
      <option value="red" Style="background-color: red ; color : white">red</option>
      <option value="orange" Style="background-color: orange; color : white">orange</option>
      <option value="yellow" Style="background-color: yellow; color : white">yellow</option>
      <option value="olive" Style="background-color:olive; color : white">olive</option>
       <option value="green" Style="background-color: green; color : white">green</option>
      <option value="teal" Style="background-color: teal; color : white">teal</option> 
      <option value="violet" Style="background-color: violet; color : white" >violet</option>
      <option value="purple" Style="background-color:purple; color : white">purple</option>
      <option value="pink" Style="background-color:pink; color : white">pink</option>
      <option value="brown" Style="background-color: brown; color : white">brown</option>
      <option value="grey" Style="background-color: grey; color : white">grey</option>
     
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