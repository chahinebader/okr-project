import React from "react";

import {  Row, Col,FormSelect,Card,CardBody,CardHeader } from "shards-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Chart from 'react-google-charts';

const RapportOfMois= gql`
query{
  RapportOfMois(company:"${localStorage.getItem('company')}"){
    progression
    name
    userId
  }
  }
`;
const RapportOfYear= gql`
query{
  RapportOfYear(company:"${localStorage.getItem('company')}"){
    progression
    name
    userId
  }
  }
`;
class Chartgraph extends React.Component{
constructor(props){
  super(props);
  this.state={
    type:"Last Month",
    changed: false
  };
}
  render(){
  return(
    <Card>
    {/* Select Item */}
    <CardHeader className="border-bottom">
       <Row>
            <Col>
              <FormSelect
                size="sm"
                style={{ maxWidth: "250px" }}
                onChange={(e) => { this.setState({changed: !this.state.changed})}}>
                <option value="last-month">Current Year</option>
                <option value="last-year">Current Month</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
        </Row>
    </CardHeader>
     {/* chart */}
     <CardBody>
       {this.state.changed &&(
     <Query query= {RapportOfMois} >
        {({error, loading, data: statistic})=> {
        if (loading) return <div>Loading...</div>
          if(error) return <div>Error...</div>
          let result=[]
          result.push(['rapport', 'Member Progression']);
          for(let item of statistic.RapportOfMois ){
            let obj=[item.name, +item.progression]
            result.push(obj);
          }
          return(

      <Chart height={300}
             chartType="ColumnChart"
             loader={<div>Loading Chart</div>}
             data={result}
             options={{ title: 'Progression of Keys Results',
                        chartArea: { width: '80%' },
                        hAxis: {title: ' Avis', minValue: 0,},
                        vAxis: {title: 'Rapport',},
                      }}
            legendToggle/>
     );}}
    </Query>
    )}
    {/* end Rapport of mois */}
    {!this.state.changed &&(
     <Query query= {RapportOfYear} >
     {({error, loading, data: statistic})=> {
     if (loading) return <div>Loading...</div>
       if(error) return <div>Error...</div>
       let result=[]
       result.push(['rapport', 'Member Progression']);
       for(let item of statistic.RapportOfYear ){
         let obj=[item.name, +item.progression]
         result.push(obj);
       }
       return(

   <Chart height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={result}
          options={{ title: 'Progression of Keys Results',
                     chartArea: { width: '80%' },
                     hAxis: {title: ' Avis', minValue: 0,},
                     vAxis: {title: 'Rapport',},
                   }}
         legendToggle/>
  );}}
 </Query>
    )}
    </CardBody>
  </Card>
   )}  
}

export default Chartgraph;