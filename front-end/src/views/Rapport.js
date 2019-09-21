import React from "react";

import { Container, Row, Col } from "shards-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PageTitle from "./../components/common/PageTitle";
import TeamProgression from '../components/charts/teamProgression';
import NewClosed from '../components/charts/New-Closed';
import LogChart from '../components/charts/LogChart';// change this !!!!
import ReunionByWeek from '../components/charts/reunionByWeek';
import Rapport from '../components/charts/Resource';
import Tree from  '../components/charts/TreeChart'// change this !!!
const STAR_Query= gql`
query{
    UserResource(company:"${localStorage.getItem('company')}"){
        occupe{
           userId,
           name,
           progression
        },
        libre{
           userId,
           name,
           progression
        },
        partiellement {
            userId,
            name,
            progression
        }
        
      }
  }
`;


const listUser =() =>(
    <Query query={STAR_Query}>
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>Error...</div>
     return(
          <BlogOverview data={data.UserResource}/>
     );}}
     </Query>
);
class BlogOverview extends React.Component{

tab(title: String, value: Number){
  let data=[];
  data.push(title);
  data.push(value);
  return data;
}
render(){
  return( 
 <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="" subtitle="Reporting" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
    <Col className="col-lg mb-3">
    <Rapport data={this.tab('libre',this.props.data.libre.length)}/>
    </Col> 
    <Col className="col-lg mb-3">
    <Rapport data={this.tab('Occupe',this.props.data.occupe.length)}/>
    </Col> 
    <Col className="col-lg mb-3">
    <Rapport data={this.tab('Partiellement',this.props.data.partiellement.length)}/>
    </Col> 
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        {/* {(status === "superviseur") &&(<UsersOverview data={tableSuperviseur}/>)} */}
        <TeamProgression/>
      </Col>
       {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
      <ReunionByWeek/>
      </Col>
    </Row>  

    {/* chart  */}
    <Row>
    <Col lg="8" md="12" sm="12" className="mb-4">
   <Tree/>
    </Col>
    <Col lg="4" md="6" sm="12" className="mb-4">
  {/* new vs ckosed */}
  
  <LogChart/>
    </Col>
   
    </Row>      
    <Row>
      <Col>
      <NewClosed/>
      </Col>
    </Row>
  
  </Container>


)
}}


export default listUser;
