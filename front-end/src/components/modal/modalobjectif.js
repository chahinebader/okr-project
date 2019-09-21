import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,Fade } from 'reactstrap';
import { Button,Slider, FormCheckbox,FormInput } from "shards-react"
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { WithContext as ReactTags } from 'react-tag-input';
import './modalobjectif.css'

const ASSOCIATE_OBJECTIF = gql`
  mutation AddObjectif ($title: String!,$description: String!, $date_begin: String!,$date_end: String!,$visibility: Boolean!,$level: Int!,$mission: String!,$supervisor: String!,$userid: String!,$company: String!) {
      
    createObjectif(objectifInput:{title: $title,description: $description,date_begin: $date_begin,date_end: $date_end,visibility: $visibility,level: $level,mission: $mission,supervisor: $supervisor,userid: $userid,company: $company}) {
        title
        description
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
    for(const item of this.props.data.supervisors[0].getSupervisors){
   
         let index={
             id: item._id,
             text: item.name
         };
         obj.push(index);
    }


    this.handleSlide = this.handleSlide.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = {isinserted: false,valuetitle: '',title:'',validtitle: false,description: '',startdate:'',enddate:'', modal: false,name: '',team :'' ,country: '', level: 5,visibility: true,tags: [],suggestions: obj};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  verifyInputDescription(event) {
    this.setState({valuedescription: event.target.valuedescription});

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
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
    this.setState({
      isinserted: false
    });
}

handleAddition(tag) {
  if (!this.state.isinserted) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
    this.setState({
      isinserted: !this.state.isinserted
    });
  }
    
}

  handleSubmit(event) {
    event.preventDefault();
     }


  render() {
    let title;
    let description;
    let date_begin;
    let date_end;
    let missionobj = this.props.data.id ;
  
    const { tags, suggestions } = this.state;
    return (
              <Mutation mutation={ASSOCIATE_OBJECTIF}>
      {createObjectif => ( 

       <div> 
   
        <Button theme="accent" onClick={this.toggle}>Associate objectif</Button>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={e => {
              e.preventDefault();
              createObjectif({ variables: { title: this.state.title, description: description.value,date_begin: date_begin.value,date_end:date_end.value,visibility: this.state.visibility,level: this.state.level,mission: missionobj,supervisor: tags[0].id,userid: localStorage.getItem("userId"),company: localStorage.getItem("company")   } });
              title.value = "";
              description.value = "";
              date_begin.value="";
              date_end.value="";

            }}>
          <ModalHeader>Add objectif</ModalHeader>
          <div id="wrapper">
          <div className="scrollbar" id="style-default">
          <div className="force-overflow"></div> 
          <ModalBody> 
          <div className="public-visibility-keyresult">
              <span className="public-span">Public</span>
              <FormCheckbox
        toggle
        checked={this.state.visibility}
        onChange={this.handleChange}>
         
      </FormCheckbox>
      </div>           
          <div className="row">
            <div className="form-group col-md-4">
            <span>title: </span>
             </div>
                <span>                 
                    <FormInput invalid = {this.state.title.length < 6} valid = {this.state.title.length >= 6} type="text"  placeholder="" className="title-input" ref={node => {
                title = node;
              }}
               value={this.state.title} onChange={e => {
                this.setState({ title: e.target.value })}} />
                </span>
                 {this.state.title.length < 6 && (
                              <Fade>
                              <p>title must be longer than 6 characters</p>
                              </Fade>
                            )} 
              </div>
              <div className="row">
            <div className="form-group col-md-4">
            <span>Supervisor: </span>
             </div>
               
                <ReactTags className="tag" tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters}
                     />
                                      {this.state.tags[0] ===undefined   && (
                              <Fade>
                              <p>objectif must have one supervisor</p>
                              </Fade>
                            )} 

              </div> 
              <div className="row">
                <span className="description-objectif"> 
                <div className="description-label-objectif">
            <span>description:</span>
             </div>                 
                    <input type="textarea" className="description-input-objectif" ref={node => {
                description = node;
              }}   id="description"  />                  
                </span>
              </div>
              <div className="row">
                <div className="dates-field">
     
            <div className="date-label-objectif">
            <span>start:</span>
             </div>
                <span className="span-date-begin">                  
                    <input type="date" className="date-input-objectif"  ref={node => {
                date_begin = node;
              }}  id="description" value={this.state.startdate} onChange={e => {
                this.setState({ startdate: e.target.value })

                }}  />
                    
                </span>
           <div className="date-end-section">
            <div className="date-label-objectif">
            <span>end:</span>
             </div>
                <span className="span-date-end">
                   
                    <input type="date" className="date-input-objectif" ref={node => {
                date_end = node;
              }}  id="description" value={this.state.enddate} onChange={e => {
                this.setState({ enddate: e.target.value })

                }}  />                   
                </span>


                </div>
                </div>
                                                
                {this.state.startdate > this.state.enddate  && (
                              <Fade>
                              <p>start date must be before ending date</p>
                              </Fade>
                            )} 
              </div>
           
          <div className="row-level">
          <div className="poids-span">poids</div>
            <div className="slider-section">
          <Slider
          tooltips
      theme="success"
      steps= {1}
      pips={{ mode: "steps", stepped: true, density: 3 }}
      connect={[true, false]}
      start={[this.state.level]}
      range={{ min: 0, max: 10 }}
      onSlide= {this.handleSlide}
    />
    </div>
          </div>
                 
          </ModalBody>
          <ModalFooter>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
            <Button type="submit" theme="success" onClick={this.toggle} disabled= {!(this.state.title.length > 6 && this.state.tags[0] !==undefined && (this.state.startdate < this.state.enddate))}>Add Objectif</Button>
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
export default ModalComponent ;