import React from "react";
import {  Card, CardHeader, CardBody,FormSelect,Progress } from "shards-react";
import { Query } from "react-apollo";
import "../../style/statisticTable.css";
import CircularProgressbar from 'react-circular-progressbar';
class UsersOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      obj:null
    };
    
  }
render() {
    const { title } = this.props;
    return (
      <Query query= {this.props.data} >
      {({error, loading, data})=> {
        if (loading) return <div>Loading...</div>
        if(error) return <div>Error...</div>
        return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
        <div className="row">
      
        <FormSelect className="selectList">
        {data.objectifbyuserid.map(item =>(
         <option value={item._id}>{item.title}</option>
        ))}
        </FormSelect>
        <div className="text-center">
        <span className="text-muted">Team :<span className="text-success">{data.objectifbyuserid[0].team.name}</span></span>
        </div>
     <CircularProgressbar percentage={data.objectifbyuserid[0].progression.toFixed(2)}  text={data.objectifbyuserid[0].progression.toFixed(2)+"%"} className="progress-cercle-objectif"/>
      
     <br/> <br/> 
        </div>
        <div>
        
       </div>
        <div className="tablecontainer">
       
      <div  className="scrollbarTable">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Progression</th>
      <th scope="col">Date Begin</th>
      <th scope="col">Date End</th>
      </tr>
  </thead>
  
  <tbody>
  {data.objectifbyuserid.map(item =>(
 
   
       item.keyResults.map(key =>{
         let dateBegin = new Date(key.date_begin);
         let dateEnd = new Date(key.date_end);
        return(
          <tr>
          <th >{key.title} </th>
          <td> <Progress value={key.progression}/></td>
          <td>{dateBegin.getDay()+"-"+dateBegin.getMonth()+"-"+dateBegin.getFullYear()}</td>
          <td>{dateEnd.getDay()+"-"+dateEnd.getMonth()+"-"+dateEnd.getFullYear()}</td>
          </tr>
        );
      })
       ))}
  
  </tbody>
</table>
</div>
</div>

        </CardBody>
      </Card>
        );}}
        </Query>
    );
  }
}



export default UsersOverview;
