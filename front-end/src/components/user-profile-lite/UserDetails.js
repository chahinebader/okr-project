import React from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const Userquery = gql`
query {
  MyProgression(id: "${localStorage.getItem('userId')}"){
    total
  }
}`;


  

class UserDetails extends React.Component{

render(){
  return(
<Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={require("../../images/avatars/"+localStorage.getItem('avatar'))}
          alt=""
          width="110"
        />
      </div>
      <h4 className="mb-0">{this.props.data.name}</h4>
      <span className="text-muted d-block mb-2">{this.props.data.status}</span>
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
           Progression...
          </strong>
          <Query query={Userquery}>
           {({ data, loading,error }) => {
            if (loading) {return <div>Loading ...</div>;}
           
            return (
     
          <Progress
          
            className="progress-sm"
            value={data.MyProgression.total}
                 >
            
            <span className="progress-value">
               {data.MyProgression.total} %
            </span>
           
          </Progress>
           );
          }}
        </Query>
          
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
      About Me
        </strong>
        <span>{this.props.data.about}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
  );
}
  
}



export default UserDetails;
