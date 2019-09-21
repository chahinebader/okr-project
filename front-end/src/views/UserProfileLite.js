import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Userquery = gql`
query {
  getUser(id: "${localStorage.getItem('userId')}"){
    _id
    email
    name
    status
    password

    avatar

  }
}

`;



const UserAccount = () => (
  <Query query={Userquery}>
 {({ data, loading,error }) => {
      if (loading) {
        return <div>Loading ...</div>;
      }
     // if (error) return <div>Error ...</div>;
     
      return (
        <UserProfileLite data={data}/>
      );
    }}
  </Query>
 
);
class UserProfileLite extends React.Component{

render(){
  return(
    <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserDetails data={this.props.data.getUser} />
      </Col>
      <Col lg="8">
        <UserAccountDetails data={this.props.data.getUser}/>
      </Col>
    </Row>
  </Container>
  );
}
 
}

export default UserAccount;
