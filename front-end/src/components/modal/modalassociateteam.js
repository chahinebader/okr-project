import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from "shards-react";
import { WithContext as ReactTags } from 'react-tag-input';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import './modalassociateteam.css'


const ASSOCIATE_TEAM_OBJECTIF = gql`
  mutation AddTeamObjectif ($idobjectif: ID!,$idteam: ID!) {
      
    associateteamtoobjectif(idobjectif:$idobjectif,idteam:$idteam) {
    title
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
 let obj=[];
 for(const item of this.props.data.teams){

      let index={
          id: item._id,
          text: item.name
      };
      obj.push(index);
    
 }
 let teamAssociated ;
 if (this.props.team !==null) {
  teamAssociated = {
  id: this.props.team._id,
  text: this.props.team.name
}
}

    this.state = { modal: false,name: '',team :'' ,country: ''};

    if (teamAssociated!==null) {
      this.state= {tags: [teamAssociated],suggestions: obj,isinserted : true} ;

    }
    if (teamAssociated === undefined) {
      this.state= {tags: [],suggestions: obj,isinserted : false} ;
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);

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
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
    this.setState({"isinserted": false});
}

handleAddition(tag) {
  if (!this.state.isinserted) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
    this.setState({"isinserted": true});
  }
}



  handleSubmit(event) {
    event.preventDefault();
     }


  render() {
    const { tags, suggestions } = this.state;
    return (
              <Mutation mutation={ASSOCIATE_TEAM_OBJECTIF}>
      {associateteamtoobjectif => ( 

       <div>

        <Button outline className="button-team" onClick={this.toggle}> Associate team<i class="fas fa-users"></i></Button>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={e => {
              e.preventDefault();       
              associateteamtoobjectif({ variables: { idobjectif: this.props.data.id, idteam: tags[0].id } });
            }}>
          <ModalHeader>Associate Team</ModalHeader>
          <div class="force-overflow"></div> 
          <ModalBody>            
          <div className="row">
            <div className="form-group col-md-4">
            <label>team name: </label>
             </div>              
                <ReactTags className="tag" tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters} 
                    placeholder={'team name'}
                    
                     />
              </div>              
          </ModalBody>
          <ModalFooter>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
            <Button type="submit" theme="success" onClick={this.toggle} disabled= {!this.state.isinserted}>Associate Team</Button>
          </ModalFooter>
         
          </form>
        </Modal>
        </div>
        )}
    </Mutation>                       
    );
  }
}
export default ModalComponent;