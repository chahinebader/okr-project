import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, Button } from "shards-react";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import { Message } from 'semantic-ui-react'


class Editor extends React.Component{
state={
  objet:'',
  description: '',
  message: false,
  warring : false
}
 render(){

  const POST_MUTATION = gql`
  mutation PostMutation($objet: String!, $description: String!, $date: String!) {
    createReclamation(reclamationInput:{objet: $objet, description: $description, date: $date}){
    _id
    }
  }
`;
  return(
  <Card small className="mb-3">
    <CardBody>
      {this.state.message && (
    <Message success header='Successful Send' content="You're Reclamation has been sent to responsible of platforme " />
    )}
       {this.state.warring && (
     <Message negative header='Failed Send' content="Please complete the following " />
   )}
    <Mutation mutation={POST_MUTATION}>
         {postMutation =>(
      <Form className="add-new-post" onSubmit={e => {
        e.preventDefault();
        if(this.state.description.length===0 || this.state.objet.length===0) {
          this.setState({warring: true});
          return;
        }
        postMutation({variables:{objet: this.state.objet, description: this.state.description, date: new Date().toISOString() }});
        e.target.objet.value='';
        this.setState({description : ''});
        this.setState({objet : ''});
        this.setState({message : true});
        
      }}>
        <FormInput size="lg" id="objet" innerRef={this.state.objet} className="mb-3" placeholder="Your Reclamation Objet" onChange={e =>{this.setState({ objet: e.target.value })}}/>
        <ReactQuill className="add-new-post__editor mb-1" id="description" value={this.state.description}  onChange={e => this.setState({ description: e })} />
        <Button theme="accent" type="submit">Send</Button>
        </Form>
       )} 
       </Mutation>
    </CardBody>
  </Card>
  );
 }
}
export default Editor;
