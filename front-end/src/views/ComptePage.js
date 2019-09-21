/* eslint-disable */
import React, { Component } from 'react';
import SpicyDatatable from 'spicy-datatable';
import '../style/compte.css';
import ModalAdd from '../components/modal/modalAddUser';
import ModalEdit from '../components/modal/modalEditUser';
import ModalDelete from '../components/modal/deleteUser';
import datas from '../data/demo-data';
import { Icon } from 'semantic-ui-react';
import { Card, CardBody, Form, FormInput, Button } from "shards-react";
const { columns, customOptions } = datas;
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const STAR_Query = gql`
query {
Membres(company:"${localStorage.getItem('company')}"){
  _id,
  name,
  email,
  status,
  expired,
  avatar
} 
}
`;
let demo =1;
let  clickDebugger=null;


const listUser=() =>(
<Query query={STAR_Query} pollInterval={1000} >
 {({ data, loading,error }) => {
     let x=JSON.parse(JSON.stringify(data));
 if (loading) return <div>Loading...</div>
 if(error) return <div>Error...</div>
 const rowsWithCallback = x.Membres.map((r) => { 
     r.expired= r.expired.toString() ;
     r.img=r.avatar;
     r.avatar = <img src={require(`../images/avatars/${r.avatar}`)} width='30px' height='30px'  className="avatarImg" /> ;

  r.action= <div class="btn-group" role="group" aria-label="Basic example"><ModalEdit data={r}/> <ModalDelete data={r._id}/></div>
  return  (Object.assign({}, r)) 
 });
 return (
    <div className="App">
    <div>
     <ModalAdd/>  
    </div>   
    <div className="App-intro">
  
      {clickDebugger ? clickDebugger : null}
      {demo === 1 ?
        <SpicyDatatable tableKey="demo-table-genral" columns={columns} rows={rowsWithCallback} config={{ showDownloadCSVButton: true }}/> :
        <SpicyDatatable tableKey="demo-table-custom-options" columns={columns} rows={rowsWithCallback} config={customOptions} />
      }
     
    </div>
  </div> 
 );
  }} 
</Query>  


)

export default listUser;
