import React from "react";
import { Query,Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,FormGroup,FormInput} from "shards-react"
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar/dist/fullcalendar.min.css";
import "fullcalendar-scheduler/dist/scheduler.min.css";
import "../style/calendar.css";
import { WithContext as ReactTags } from 'react-tag-input';
import CryptoJS from "crypto-js";
import axios from 'axios';
let status=CryptoJS.AES.decrypt(localStorage.getItem('status'),
 'secret key 123').toString(CryptoJS.enc.Utf8);

const Add_Reunion =gql`

mutation Addreuinon($title: String!,$creator: String!,$team:String!,$start: String!){
    createReunion(reunionInput:{title:$title,start:$start,creator:$creator,team:$team,company:"${localStorage.getItem('company')}"}){
     _id
   }
 }

`;
const GETReunionSuperviseur = gql`
  query {
    reunionsbyCreator(id:"${localStorage.getItem('userId')}") {
      title
      start
      end
    }
  }
`;
const GETReunionMembre = gql`
  query {
    reunionsbyMembre(id:"${localStorage.getItem('userId')}")  {
      title
      start
      end
    }
  }
`;

const TEAM_QUERY = gql`
query {
    myTeam(id:"${localStorage.getItem('userId')}"){
  _id
  teamName

} 
}
`;
let GET_Reunion= GETReunionMembre;
if(status==="superviseur"){ 
GET_Reunion=GETReunionSuperviseur;
}
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const listUser=() =>(
    <Query query={TEAM_QUERY} >
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>error</div>
     return(
      <Keyresultcalendar data={data.myTeam}/>
     );}}
     </Query>
)

class Keyresultcalendar extends React.Component {
  constructor(props){
      super(props)
      let obj=[];
 for(const item of this.props.data){

      let index={
          id: item._id,
          text: item.teamName
      };
      obj.push(index);
 }
 
 
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.state = { modal: false,title:"",date:null,time: null,tags: [],suggestions: obj};
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
  }
 //Modal view
 toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  sendNotif(){
   
    let date= new Date(this.state.date);
    axios.post('http://localhost:4000/mailNotif', {
     
        email:"sfaxi.abdelkarim@gmail.com",
        text:
        `Nous avons l’honneur de vous convier à une réunion d’information le ${date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()} à  ${this.state.time}.Cette rencontre sera l’occasion d’aborder ${this.state.title}.Dans un souci d’organisation, nous vous serions reconnaissants de nous confirmer rapidement votre présence par courrier,ou en contactant directement M.Zeineb belguith.\n Espérant vous compter parmi les membres présents,nous vous prions d’agréer, \n\nMadame / Monsieur, l’expression de nos sentiments les meilleurs.`,
        subject:"New Réunion",
      },
    )
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
     })
  }
  handleStartDateChange(value) {
    this.setState({
      ...this.state,
      ...{ date: new Date(value) }
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




  render() {
    const { tags, suggestions } = this.state;
    return (
        <Query query={GET_Reunion} >
        {({ data: list, loading,error }) => {
        if (loading) return <div>Loading...</div>
        if(error) return <div>error Reunion</div>
        let listreunion=null;
        if(status==="superviseur"){
            listreunion=list.reunionsbyCreator;
        }else if(status==="membre"){
            listreunion=list.reunionsbyMembre;
        }
        return(

      <div id="example-component" >
      {/* Modal Add Réunion */}
      
      {((status==="superviseur")&&(this.state.modal))&& (
     <Mutation mutation={Add_Reunion}>
     {addreunion => ( 
       <Modal isOpen={this.state.modal}>
        <form onSubmit={e => {
              e.preventDefault(); 
              let x =new Date(this.state.date+" "+this.state.time)
              // let dateTime=new Date(x.getFullYear()+"-"+x.getDay()+"-"+x.getMonth()+" "+this.state.time+":00");      
              addreunion({ variables: { title: this.state.title+"  with "+tags[0].text, team: tags[0].id, start: x,creator:localStorage.getItem('userId'), } });
              this.sendNotif();
              this.setState({modal:false});
             
              
              
            
            }}>
          <ModalHeader>ADD New Réunion</ModalHeader>
           
          <ModalBody>
         
        <FormGroup>
        <label htmlFor="#title">Title</label>
        <FormInput id="#title" placeholder="Title" onChange={(e)=> this.setState({title:e.target.value})}/>
        </FormGroup>
        <label htmlFor="#title">Date-Time</label>
        <div className="row">
         <FormInput className="timeinput" type="date" placeholder="date" onChange={(e)=> this.setState({date:e.target.value})}/>
         <FormInput className="timeinput" type="time" placeholder="Time" onChange={(e)=> this.setState({time:e.target.value})}/>
         </div> 
            <label>Team Name: </label>
             <div>              
             <ReactTags className="tag" tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters} />
              </div>     
          </ModalBody>
          <ModalFooter>
            <Button type="submit" theme="accent">Submit</Button>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
         
       
          </form>
        </Modal>
           )}
           </Mutation>
         )}
           {/* End Modal */}
        
                <FullCalendar
                  id="your-custom-ID"
                  plugins= 'bootstrap' 
                  defaultView= 'listWeek'
                  timeZone= 'UTC'
                  customButtons= {{
                    addEventButton: {
                      text: 'Add Réunion',
                      click:  this.toggle,
}
                   }}
                  views= {{
                    
                    listWeek: { buttonText: 'list week' },
                    listMonth: { buttonText: 'list month' }
                  }}
                  header={{
                   
                    left: "prev,next  myCustomButton",
                    center: ' title',
                    right: 'addEventButton,listWeek,listMonth'
                  }}
                 
                  navLinks={true} // can click day/week names to navigate views
                  editable={false}
                  eventLimit={true} // allow "more" link when too many events
                  events= {listreunion}
                 eventColor="#007bff"
                />
            
           
          
      </div>
        );}}
        </Query>
    );
  }
}

export default listUser;
