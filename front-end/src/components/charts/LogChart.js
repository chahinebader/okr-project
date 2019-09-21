import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row
} from "shards-react";
import { Chart } from "react-google-charts";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../../style/rapport.css';
const STAR_Query= gql`
query($company: String!){
    Logchart(company: $company) {
  date
  progression
  user {
    name
  }
  keyResult {
    title
  }
}
  }
`;
const options = {
    title: "Age vs. Weight comparison",
    hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
    legend: "none"
  };
  let data = [];
const company = localStorage.getItem('company');
const listUser =() =>(
  <Query query={STAR_Query} variables={{company}}>
   {({ data, loading,error }) => {
   if (loading) return <div>Loading...</div>
   if(error) return <div>Error...</div>
   return(
        <Logchart data={data.Logchart}/>
   );}}
   </Query>
);
class Logchart extends React.Component{
    constructor(props){
        super(props);
        data=[];
        data[0]=['Key Result', 'Progression','member','date'];
        for(let item of this.props.data){         
            data.push([item.keyResult.title,{v: item.progression ,f: item.progression},item.user.name,item.date]);
        }
    }
     
    render(){
        return(

    <Card small >
    <CardHeader className="border-bottom">
      <h6 className="m-0">Top 10 KeyResult Log</h6>
    </CardHeader>

    <CardBody className="container">
   
    <Chart
   
      chartType="Table"
      data={data}
      options={options}
      width="100%"
      height="100%"
      legendToggle
      formatters={[
    {
      type: 'ArrowFormat',
      column: 1,
    },
  ]}
 
  rootProps={{ 'data-testid': '1' }}
    />
   
    </CardBody>
    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          
        </Col>
      </Row>
    </CardFooter>
  </Card>
            
            )
        }
    }


   

export default listUser;