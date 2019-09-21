import React from "react";
import { Container, Button} from "shards-react";
import { Card, Icon,Feed } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '../components/modal/teamModal';
import EditModel from '../components/modal/teamEdit';
import "../style/teamPage.css";
import CryptoJS from 'crypto-js';
const QueryA = gql`
query {
  AllMemberTeam(company:"${localStorage.getItem('company')}") {
    _id,
    name,
     color,
   users{
   _id,
   name,
   avatar,
   status
  },
  creator{
    _id,
    name,
    status,
    avatar
  }
  }}
`;
const STAR_Query = gql`
query {
users(company:"${localStorage.getItem('company')}"){
  _id,
  name,
  status
} 
}
`;
const QueryB = gql`
query {
  myTeam(id:"${localStorage.getItem('userId')}"){
    _id,
    teamName,
    creator,
    color,
    users{
      _id
      name,
      email,
      avatar,
      status
    }
  } 
}
`;
const status =CryptoJS.AES.decrypt(localStorage.getItem('status'), 'secret key 123').toString(CryptoJS.enc.Utf8);
class TeamPage extends React.Component{
constructor(props){
  super(props);
  this.state={All: true,
  users: null
  }
}
dataList=(item, usersList)=>{
var obj={
  item: item,
  users:usersList.users
}
return obj
}
render(){
 return(
  <Query query={STAR_Query}>

  {({ data : usersList, loading,error }) => {
 if (loading) return <div>Loading...</div>
 if(error) return <div>Error...</div>
 

 return (
    
 
   //container
  <Container fluid className="main-content-container px-4 pb-4">
  <br/>
  {!(status ==="admin")&&(
  <div className="buttonGroup">
     <Button pill onClick={()=> this.setState({All: true})} ><Icon name='group' />All Team</Button>
     <Button pill onClick={()=> this.setState({All: false})}><Icon name='user' />My Team</Button>
     {status==="superviseur" &&(
     <Modal/>
     )}
  </div>
  )}
   <br/>
   {/* Display All team  if this.state.All*/}
   {this.state.All && ( 
   <Query query={ QueryA} pollInterval={5000}>
    {({ data, loading,error }) => {
    if (loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    return (
    //map data from query
    <Card.Group  itemsPerRow={3} >
    {data.AllMemberTeam.map(item => (
    <Card color={item.color}>
    <Card.Content header={item.name}/>
    
       <Card.Content>
          <Feed>
            <Feed.Event>
                <Feed.Label image={require(`../images/avatars/${item.creator.avatar}`)} />
                   <Feed.Content>
                       <Feed.Summary>
                       
                         {item.creator.name}
                       </Feed.Summary>
                         <Feed.Date><div className="superviseur">{item.creator.status}</div> </Feed.Date>
                   </Feed.Content>
            </Feed.Event>
         </Feed>
    </Card.Content>
    { item.users.map(user =>(
       <Card.Content>
        <Feed>
         <Feed.Event>
           <Feed.Label image={require(`../images/avatars/${user.avatar}`)} />
             <Feed.Content>
                <Feed.Summary>
                   {user.name}
                </Feed.Summary>
                <Feed.Date content={user.status} />
             </Feed.Content>
       </Feed.Event>
      </Feed>
     </Card.Content> 
    ))}
    <Card.Content extra>
      <Icon name='user' />
      {item.users.length} Member + Superviseur
    </Card.Content>
</Card>
  ))}
</Card.Group>
);}}
</Query>)}
{/* Display Me team  if !this.state.All*/}
{!this.state.All &&(
  <Query query={ QueryB} pollInterval={1000}>
   {({ data, loading,error }) => {
    if (loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
  return (
  
    <Card.Group  itemsPerRow={2} >
    {data.myTeam.map(item => (
    <Card color={item.color}>
    <Card.Content header={item.teamName}/>
    <Card.Content extra>
      
      </Card.Content>
      
    { item.users.map(user =>(
       <Card.Content>
        <Feed>
         <Feed.Event>
           <Feed.Label image={require(`../images/avatars/${user.avatar}`)} />
             <Feed.Content>
                <Feed.Summary>
                   {user.name}
                </Feed.Summary>
                <Feed.Date content={user.status} />
             </Feed.Content>
       </Feed.Event>
      </Feed>
     </Card.Content> 
    ))}
    <Card.Content extra>
     
      <div className='d-flex justify-content-between'>
      <div>
      <Icon name='user' />
      {item.users.length} Member + Superviseur
      </div>
     {status==="superviseur" &&(
     <EditModel data={this.dataList(item, usersList)} />
     )}
      </div>
      
    </Card.Content>
</Card>
  ))}
</Card.Group>
  
  );}}
  </Query>
   )}
  </Container>
  );
}} 
</Query>  

  );}
  
}

export default TeamPage;
