import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Slider, FormCheckbox } from "shards-react"
import { WithContext as ReactTags } from 'react-tag-input';
import gql from "graphql-tag";
import { Mutation} from "react-apollo";
import './modalkeyresulttomember.css'


const ASSOCIATE_KEYRESULT = gql`
  mutation createKeyresult ($title: String!,$description: String!, $date_begin: String!,$date_end: String!,$visibility: Boolean!,$level: Int!,$objective: String!,$userassociated: String!,$userid: String!,$company: String!,$member:String!) {
      
    createKeyresult(keyresultInput:{title: $title,description: $description,date_begin: $date_begin,date_end: $date_end,visibility: $visibility,level: $level,objective: $objective,userassociated: $userassociated,userid: $userid,company: $company,member: $member}) {
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
export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    let obj=[];
    for(const item of this.props.data.users){
   
         let index={
           
             id: item._id,
             text: item.name
         };
         obj.push(index);
         
    }
    this.handleSlide = this.handleSlide.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = { modal: false,name: '',team :'' ,country: '', level: 5,visibility: true,tags: [],suggestions: obj,isfilled: ''};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
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

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
     isfilled: !this.state.isfilled
    });
}

handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag],isfilled: !this.state.isfilled})
    );
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
    const { tags, suggestions } = this.state;
    let title;
    let description;
    let date_begin;
    let date_end;
    return (
              <Mutation mutation={ASSOCIATE_KEYRESULT}>
      {createKeyresult => ( 

       <div className="footer-line"> 
   
        <Button theme="accent" onClick={this.toggle}>Associate Key Result</Button>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={e => {
              e.preventDefault();
             createKeyresult({ variables: { title: title.value, description: description.value,date_begin: date_begin.value,date_end:date_end.value,visibility: this.state.visibility,level: this.state.level,objective: this.props.data.id,userassociated: tags[0].id,userid: localStorage.getItem("userId"),company: localStorage.getItem("company"),member: tags[0].id } });
              title.value = "";
              description.value = "";
              date_begin.value="";
              date_end.value="";

            }}>
          <ModalHeader>Add Key Result</ModalHeader>
          <div id="wrapper">
          <div class="scrollbar" id="style-default">
          <div class="force-overflow"></div> 
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
                    <input type="textarea"  placeholder="" className="title-input" ref={node => {
                title = node;
              }}   />
                  
                </span>
              </div>
              <div className="row">
            <div className="form-group col-md-4">
            <span>Responsible: </span>
             </div>
               
                <ReactTags className="tag" tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters} />

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
              }}  id="description"  />
                    
                </span>
           <div className="date-end-section">
            <div className="date-label-keyresult">
            <span>end:</span>
             </div>
                <span className="span-date-end">
                   
                    <input type="date" className="date-input-keyresult" ref={node => {
                date_end = node;
              }}  id="description"  />
                    
                </span>
                </div>
                </div>
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
            <Button type="submit" theme="success" onClick={this.toggle}>Associate Key Result</Button>
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
