import React from "react";
import { Card, CardHeader, CardBody} from "shards-react";
// import Chart from "../../utils/chart";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Chart } from "react-google-charts";
const STAR_Query= gql`
query{
    missiontree(company:"${localStorage.getItem('company')}"){
        name
        progression
        date_begin
        date_end
        creator{
          _id
           name
            status
        }
        children{
          name
          progression
          date_begin
          date_end
          creator{
            _id
            name
            status
          }
          children{
            name
            progression
            date_begin
            date_end
            creator{
              _id
               name
            status
            }
          }
          
        }
      }
  }
`;

    
let data =[];
const listTeam =() =>(
    <Query query={STAR_Query}>
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>Error...</div>
     return(
          <TreeChart data={data.missiontree}/>
     );}}
     </Query>
);
class TreeChart extends React.Component {
  constructor(props) {
    super(props);
    data=[];
    data.push([
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },]);
    
        for(let item of this.props.data){
        data.push([item.name,item.name,null,new Date(item.date_begin),new Date(item.date_end),null,item.progression,null]);
        for(let ch of item.children){
          data.push([ch.name,ch.name,item.name,new Date(ch.date_begin),new Date(ch.date_end),null,ch.progression,null]);
        }
     }
   
  
   
  }

  
  render() {
   
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Mission And Objectif Progression </h6>
        </CardHeader>
        <CardBody className="pt-0">
        <Chart
           chartType="Gantt"
           data={data}
           width="100%"
           height="380px"
           legendToggle
         />
         
        </CardBody>
      </Card>
    );
  }
}




export default listTeam;
