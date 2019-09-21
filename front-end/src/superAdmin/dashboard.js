import React, { Component, Fragment } from 'react';
import './style/sb-admin.css'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
 import NavbarToggle from '../components/layout/MainNavbar/NavbarNav/UserActionsAdmin'
 const STAR_Query = gql`
 query {
  population{
    user
    company
    reclamation
  }
 }
 `;

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
    const items = [
      {
        header: 'Company',
        description: this.props.data.population.company,
       
      },
      {
        header: 'Users',
        description: this.props.data.population.user,
       
      },
      {
        header: 'Reclamations',
        description: this.props.data.population.reclamation,
       
      }];
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
  <li class="navAdmin-item">
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
        <span>Dashboard</span>
      </li>
      <li class="breadcrumb-item active">Database Population</li>
    </ol>
    <Card.Group itemsPerRow={3} items={items} />
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
