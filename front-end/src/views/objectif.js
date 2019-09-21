import React from "react";
import { ListGroup,ListGroupItem,Container, Row, Col,Button,Card,CardHeader,CardBody,CardFooter,Progress,Form} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalAssociateKeyresulttomember from '../components/modal/modalkeyresulttomember';
import ModalKeyresultAssociated from '../components/modal/modalkeyresultassociated';
import ModalAssociateTeam from '../components/modal/modalassociateteam';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import '../style/objectif.css' ;

const TEAM_QUERY = gql`
query {
teams(company:"${localStorage.getItem('company')}"){
  _id
  name

} 
}
`;



const GET_OBJECTIFS = gql`query($userid: String!)  {    
  objectifbyuserid(userid: $userid){
    _id
    title
    description
    date_begin
    date_end
    progression
    visibility
    creator {
      name
      avatar
    }
    team {
      _id
      name
      users {
        _id
        name
      }
    }
  
  }

  }
`;
const DELETE_TODO = gql`
mutation deleteTodo($_id: ID!) {
  deleteObjectif(id: $_id) {
    
    title
  }
}
`;

class Objectif extends React.Component {
  constructor(props) {
    super(props);
       
    this.state = {creating: false , modaldelete: false }  ; 
    this.modaldelete = this.modaldelete.bind(this);
 
  }
  modaldelete() {
    this.setState({
      modaldelete: !this.state.modaldelete
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

  ListTeams=(id,name, teams) =>{
  
    var obj={
      id: id,
      name: name,
      teams: teams.teams
    }
    return obj
  }
  ObjectifAndUsersAssociated = (idobjectif,users) => {
    var obj= {
      id: idobjectif,
      users: users
    }
    return obj ;
  }
  dataList=(item, usersList)=>{
    var obj={
      item: item,
      users:usersList.users
    }
    return obj
    }
  render() {  
    let userid = localStorage.getItem("userId");      
    return(
      <Query query= {TEAM_QUERY} >
        {({error, loading, data : teams})=> {
          if (loading) return <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>;
          if(error) return <div>Error...</div>
      return(
    <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Objectifs List" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
  <Query query={GET_OBJECTIFS} pollInterval={3000} variables={{userid}} >
      {({ loading, error, data }) => {           
        if (loading) return <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>;
        if (error) return <p>Error :(</p>; 
        return data.objectifbyuserid.map(({ _id, title,description,date_begin,date_end,level,visibility,progression,team,creator }) => {
        let datestart = new Date(date_begin);
        let d = Date(Date.now()); 
        let dateend = new Date(date_end);
        let montend = dateend.getMonth() ;
        let actmontend = montend+1 ;
        let montstart = datestart.getMonth() ;
        let actmonntst = montstart+1 ;
        let diff =  Math.floor(( Date.parse(dateend) - Date.parse(d)) / 86400000); 
        return(  <div>
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
            </Col>
                  <Col>
                  <div className="visibility-objectif">
                  <Modal isOpen={this.state.modaldelete}>
                  <Mutation mutation={DELETE_TODO} key={_id}
            update={(cache, { data: { deleteMission } }) => {
        const  objectifs  =  cache.readQuery({ query: GET_OBJECTIFS });
        const indextodelete = objectifs.objectifs.map(e=> e._id).indexOf(_id) ;
        objectifs.objectifs.splice(indextodelete); 
        cache.writeQuery({
          query: GET_OBJECTIFS,
          data: { objectifs: objectifs.objectifs }
        });
      }}>
           {deleteObjectif =>(
          <Form onSubmit={e => {         
            e.preventDefault();            
            deleteObjectif({ variables: { _id } }); 
          this.setState({modaldelete:false});            
          }}>
          <ModalHeader>Alert</ModalHeader>         
          <ModalBody>
            <span>Are You Sur To Delete This Objectif !</span>
            <span>Deleting this objectid will result as deleting  its okr</span>
          </ModalBody>
          <ModalFooter>
           <Button  theme="accent" type="submit">Yes</Button>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
           )}
           </Mutation> 
                  </Modal>
            { visibility && <Button theme="secondary" outline>  <i class="fas fa-globe"> public</i>  </Button>}
            {   !visibility && <Button theme="secondary" outline>  <i class="fas fa-users"></i> private </Button>}
                  <Button theme="danger" outline onClick={this.modaldelete}><i class="fas fa-trash"></i></Button>  
                  </div>
                  </Col>
                  </Row>
                  </CardHeader> 
                  <CardBody>
                    <Row>
                      <Col>
                  <label className="description"> {description} </label>
                  <Progress theme="success" value={progression}>{progression.toFixed(2)}%</Progress>
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
     { team &&(   <ModalAssociateKeyresulttomember data={this.ObjectifAndUsersAssociated(_id,team.users)} ></ModalAssociateKeyresulttomember>)}
               { !team &&(   <div className="text-danger">no team associated</div>)}
               <div>
                 <ModalAssociateTeam data={this.ListTeams(_id,title,teams)} team={team} ></ModalAssociateTeam>
               </div>
               <div className="keyresult-associated">
               <ModalKeyresultAssociated data={_id} > </ModalKeyresultAssociated>
               </div>
                  <div className="creator-section-objectif">
                  <label>created by {creator.name}
                  <img className="enteteImage" alt="avatar-creator"  src={require(`../images/avatars/${creator.avatar}`)}/></label>
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
         ); }}
    </Query>

    

    
    );

    

    }
    
  }

export default Objectif;
