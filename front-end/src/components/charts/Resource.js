import React from "react";
import {
  Card,
  CardBody,
} from "shards-react";
import { Chart } from "react-google-charts";

import '../../style/rapport.css';

const options = {
    title: "Age vs. Weight comparison",
    hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
    legend: "none"
  };
  let data = [];
// const listUser =() =>(
//     <Query query={STAR_Query}>
//      {({ data, loading,error }) => {
//      if (loading) return <div>Loading...</div>
//      if(error) return <div>Error...</div>
//      return(
//           <Resource data={data.UserResource}/>
//      );}}
//      </Query>
// );
class Resource extends React.Component{
    constructor(props){
        super(props);
         data=[];
       data.push([this.props.data[0]],);
       data.push([this.props.data[1]],);
    }
     
    render(){
        return(

    <Card small className={this.props.data[0]}>
   

    <CardBody className="container">
   
    <Chart
   
      chartType="Gauge"
      data={data}
      options={options}
      width="100%"
      height="100px"
      legendToggle
    />
   
    </CardBody>
  </Card>
            
            )
        }
    }


   

export default Resource;