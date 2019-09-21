import React from "react";
import {
  Card,
  CardBody,
} from "shards-react";
import { Chart } from "react-google-charts";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../../style/rapport.css';
const STAR_Query= gql`
query{
newClosedObjectif(company:"${localStorage.getItem('company')}"){
  New
  closed
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
const listUser =() =>(
    <Query query={STAR_Query}>
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>Error...</div>
     return(
          <NewClosed data={data.newClosedObjectif}/>
     );}}
     </Query>
);
class NewClosed extends React.Component{
    constructor(props){
        super(props);
        let yearnow = new Date ().getFullYear();
        data[0]=[{ type: 'date', label: 'New vs Closed' },
        'New',
        'Closed', ];
        let x=0
        for(let item of this.props.data.New){
           
            data.push([new Date(yearnow,x),item,this.props.data.closed[x]]);
            x++;
        }
    }
     
    render(){
        return(

    <Card small >
   

    <CardBody className="container">
   
    <Chart
   
      chartType="Line"
      data={data}
      options={options}
      width="100%"
      height="100%"
      legendToggle
    />
   
    </CardBody>
  </Card>
            
            )
        }
    }


   

export default listUser;