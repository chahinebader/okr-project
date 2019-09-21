import React from "react";

import {  Card, CardHeader, CardBody } from "shards-react";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Confetti from 'react-confetti'
import "../../style/bestDeveloper.css"
const Start_Query=gql`
query{
    bestDeveloper(company:"${localStorage.getItem('company')}"){
      name
      avatar
      status
      email
    }
    }`;
const bestDev = () =>(
<Query query= {Start_Query} >
  {({error, loading, data})=> {
     
    if (loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    return(
        <BestDeveloper data={data}/>
    );
    }}
    </Query> 

)
class BestDeveloper extends React.Component {

  render() {

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Best Employee Of This Month </h6> 
        </CardHeader>
        <CardBody className="pt-0">
        <Confetti className="animation" gravity={0.06} recycle={false}/>
         <div className="avatarContainer">
         <div className="row">
            <img className="medialler" alt="medialler" src={require(`../../images/medaille.png`)} width="150px"/>
            </div>
            <img className="avatar"  alt="avtarBestDev" src={require(`../../images/avatars/`+this.props.data.bestDeveloper.avatar)} width="150px"/>
            <span> <h4>{this.props.data.bestDeveloper.name}</h4></span>
            <span className="text-muted d-block mb-2">{this.props.data.bestDeveloper.status}</span>
            </div>
        </CardBody>
      </Card>
    );
  }
}



export default bestDev;
