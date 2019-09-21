import React, { Component, Fragment } from 'react';
import './style/sb-admin.css'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "shards-react";
import Model from '../components/modal/modal';
import {NavLink} from 'react-router-dom'
 import NavbarToggle from '../components/layout/MainNavbar/NavbarNav/UserActionsAdmin'
 const STAR_Query = gql`
 query {
  reclamations{
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
 const dashboard=() =>(
 <Query query={STAR_Query} pollInterval={1000} >
  {({ data, loading,error }) => {
  if (loading) return <div>Loading...</div>
  if(error) return <div>Error...</div>
    
  return(
    <Dashboard data={data}/>
  )
  }}
  </Query>
 )


class Dashboard extends Component {
 
  render() {
   
    return (
        <Fragment>
<nav class="navAdminbar navAdminbar-expand navAdminbar-dark bg-dark static-top">
<span class="navAdminbar-brand mr-1" >OKR Administration</span>
<form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
  <div class="input-group">
    </div>
</form>
<ul class="navAdminbar-navAdmin ml-auto ml-md-0">
  <li class="navAdmin-item dropdown no-arrow">
    <NavbarToggle/>
  </li>
</ul>
</nav>
<div id="wrapperAdmin">
<ul class="sidebarAdmin navAdminbar-navAdmin">
  <li class="navAdmin-item active">
  <NavLink to="/administration/dashboard">
    <span class="navAdmin-link">
      <i class="fas fa-fw fa-tachometer-alt"></i>
      <span>Dashboard</span>
    </span>
    </NavLink>
  </li>
  <li class="navAdmin-item active">
  <NavLink to="/administration/reclamation">
    <span class="navAdmin-link">
      <i class="fas fa-fw fa-chart-area"></i>
      <span>Reclamation</span></span>
</NavLink>
  </li>
  </ul>
<div id="content-wrapperAdmin">
  <div class="container-fluid">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <span>Reclamation</span>
      </li>
      <li class="breadcrumb-item active">Overview</li>
    </ol>
    <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">All Reclamation</h6>
    </CardHeader>
    <div id="wrapperC">
   
    <CardBody className="p-0">
      <ListGroup flush>
      {this.props.data.reclamations.map(item => (
       
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
 
  </Card>
  </div>
  <footer class="sticky-footer">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright © Satoripop 2019</span>
      </div>
    </div>
  </footer>
</div>
</div>


</Fragment>
    );
  }
}

export default dashboard;
