/* eslint jsx-a11y/anchor-is-valid: 0 */
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "shards-react";
import Model from '../modal/modal';
import './silderAction.css';

const STAR_Query = gql`
query {
reclamationsUser(id:"5c6bfec8e5001a2c7cb08ad4"){
  _id,
  objet,
  description,
  date
} 
}
`;
const dateDisplay= (date: String)=>{
  var d= new Date(date);
  var display =d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDay()+" at "+d.getHours()+":"+d.getMinutes();
  return display;
}

const SidebarActions = ({ title }) => (
  <Query query={STAR_Query} pollInterval={1000} >
  {({ data, loading,error }) => {
  if (loading) return <div>Loading...</div>
  if(error) return <div>Error...</div>
   return (
   
   
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <div id="wrapperC">
    <div class="scrollbarC" id="style-default">
    <CardBody className="p-0">
      <ListGroup flush>
      {data.reclamationsUser.map(item => (
       
        <ListGroupItem className="p-3" key={item._id}>
          
            <div className="text-center">
            <span className="mb-0">{item.objet}</span>
           <br></br>
             <span className="text-muted" ><i>{ dateDisplay(item.date)}</i></span>
            
            <br/>
            </div> 
            <span>
            <Model data={item.description}/>
        
          </span>
         
        </ListGroupItem>
        ))}
        <ListGroupItem className="d-flex px-3 border-0">
        </ListGroupItem>
      </ListGroup>
    </CardBody>
    </div>
 </div>
  </Card>
 
 
  
);
}}
</Query>



);

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarActions.defaultProps = {
  title: "My Reclamation"
};

export default SidebarActions;
