import React from "react";
import { ListGroup,ListGroupItem,Container, Row, Col,Button,Card,CardHeader,CardBody,CardFooter,Progress,Form} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modalobjectif from '../components/modal/modalobjectif';
import ModalMission from '../components/modal/modalmission';
import ModalObjectifAssociated from '../components/modal/modalobjectifassociated';
import ModifyMission from '../components/modal/modifymission';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import '../style/mission.css' ;



const GET_SUPERVISORS = gql`query  {    
  getSupervisors(company:"${localStorage.getItem('company')}"){
    _id
    name 
  }
  }
`;

const GET_MISSIONS = gql`query  {    
  missions(company:"${localStorage.getItem('company')}"){
    _id
    title
    description
    date_begin
    date_end
    progression
    creator {
      name
      avatar
    }
  
  }

  }
`;
const DELETE_TODO = gql`
mutation deleteTodo($_id: ID!) {
  deleteMission(id: $_id) {
    
    title
  }
}
`;
const listsuperviseurs=() =>(
  <Query query={GET_SUPERVISORS} pollInterval={3000}>

  {({ data, loading,error }) => {
 if (loading) return <div>Loading...</div>
 if(error) return <div>Error...</div>
 return (
     <Mission superviseurs={data}/>
 );
  }} 
</Query>  
);

class Mission extends React.Component {
  constructor(props) {
    super(props);
       
    this.state = {creating: false, modal: false , modaldelete: false }  ; 
    this.toggle = this.toggle.bind(this);
    this.modaldelete = this.modaldelete.bind(this);
 
  }
  modaldelete() {
    this.setState({
      modaldelete: !this.state.modaldelete
    });
  };
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      };    
      startCreateEventHandler = () => {
        this.setState({ creating: true });
      };
    
      modalConfirmHandler = () => {
        this.setState({ creating: false });
      };
    
      modalCancelHandler = () => {
        this.setState({ creating: false });
      };
      ListUsers=(id,name, teams) =>{
  
  var obj={
    id: id,
    name: name,
    teams: teams.teams
  }
  return obj
}
  render() {  
    const MissionsList = () => {
      
    return(
    <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Missions List" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      
      <div className="create-mission">
    <ModalMission></ModalMission>
    </div>
    </Row>


  <Query query={GET_MISSIONS}  pollInterval={2000}>
      {({ loading, error, data }) => {  
     
        if (loading) return <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>;
        if (error) return <p>Error :(</p>; 
        if (data.missions === undefined || data.missions.length === 0) return <div><h2>You didn't create any mission yet</h2></div> ;
        
        return data.missions.map(({ _id, title,description,date_begin,date_end,visibility,progression,creator }) => {
          let d = Date(Date.now()); 
          
        let datestart = new Date(date_begin);
        let dateend = new Date(date_end);
        let montend = dateend.getMonth() ;
        let actmontend = montend+1 ;
        let montstart = datestart.getMonth() ;
        let actmonntst = montstart+1 ;
        let missionsupervisors = {"id" : _id , "supervisors": [this.props.superviseurs]};
        let diff =  Math.floor(( Date.parse(dateend) - Date.parse(d)) / 86400000); 
        return(            
                <div key={_id}>
                <ListGroup >
      <ListGroupItem className="card-mission" >
        <Card >
                <CardHeader>
                  <Row>
                  <Col>
                  <label className="title">{title}</label>
                  </Col>
                  <Row>
                 { !(diff <= 0) && <label> days remaining: {diff} day(s)</label> }
                 <br></br>
                 { (diff <= 0) && <label className="text-danger"> expired !</label> } 
                 </Row>                  
                  <Col>
                 <Row>
                 
                  <div className="delete-section">
                  <ModifyMission data={{_id,title,description,date_begin,date_end}}></ModifyMission>

                  
                  <div>
                  <Modal isOpen={this.state.modaldelete}>
                  <Mutation mutation={DELETE_TODO} key={_id}
            update={(cache, { data: { deleteMission } }) => {
        const  missions  =  cache.readQuery({ query: GET_MISSIONS });
        const indextodelete = missions.missions.map(e=> e._id).indexOf(_id) ;
        missions.missions.splice(indextodelete); 
        cache.writeQuery({
          query: GET_MISSIONS,
          data: { missions: missions.missions }
        });
      }}>
           {deleteMission =>(
          <Form onSubmit={e => {         
            e.preventDefault();            
          deleteMission({ variables: { _id } }); 
          this.setState({modaldelete:false});            
          }}>
          <ModalHeader>Alert</ModalHeader>
         
          <ModalBody>
            <span>Are You Sur To Delete This Mission !</span>
            <span>Deleting this mission will result as deleting its objectif children and so its okr</span>
          </ModalBody>
          <ModalFooter>
           <Button  theme="accent" type="submit">Yes</Button>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
           )}
           </Mutation> 
                  </Modal>
                  <Button theme="danger" outline className="delete-button" onClick={this.modaldelete}><i className="fas fa-trash"></i></Button>  
                  </div>
                           
            </div>  
            </Row>               
                  </Col>
                  </Row>
                  </CardHeader> 
                  <CardBody>
                    <Row>
                      <Col>
                  <label className="description"> {description} </label>
                  <Progress theme="success" className="progressvalue-mission" value={progression}>{progression.toFixed(2)}%</Progress>
                  </Col>
                  <Col>
                  <div className="dates-align">
                  <Row>                   
                  <label className="date-begin"> begin  {datestart.getFullYear()+"-"+actmonntst+"-"+datestart.getDate()}</label>
                  </Row> 
                  <Row>
                <label className="date-end"> finish  {dateend.getFullYear()+"-"+actmontend+"-"+dateend.getDate()}</label>
                </Row>

                 </div>
                 </Col>
                  </Row>
                 
                  </CardBody>
   <CardFooter> 
     <Row>                 
                  <Modalobjectif data={missionsupervisors} ></Modalobjectif>
                  <ModalObjectifAssociated data={_id}> </ModalObjectifAssociated>
                  
                  <div className="creator-section">
                  <label>created by {creator.name}
                  <img alt="creator-avatar" className="enteteImage"  src={require(`../images/avatars/${creator.avatar}`)}/></label>
                  </div>
                  </Row>     
                  </CardFooter>  
                </Card>
                </ListGroupItem>
                </ListGroup>
   
                

                </div>
                
                );

        });
      }}
    </Query>
    </Container>

    
    );
    }
 
    return MissionsList();

   
    
    
 
    }
    
  }

export default listsuperviseurs;
