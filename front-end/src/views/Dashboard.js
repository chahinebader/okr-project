import React from "react";
import { Container, Row, Col } from "shards-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";

import UsersByDevice from "./../components/blog/UsersByDevice";
import BestDeveloper from "./../components/blog/BestDeveloper";
import RapportChart from "../components/charts/chart";

import CryptoJS from 'crypto-js';

let smallStats=[
  {
    label: "Teams",
    value: "2,390",
    percentage: "4.7%",
    increase: false,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: [1, 2, 1, 3, 5, 4, 7]
      }
    ]
  },
  {
    label: "Missions",
    value: "182",
    percentage: "12.4",
    increase: false,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(23,198,113,0.1)",
        borderColor: "rgb(23,198,113)",
        data: [1, 2, 3, 3, 3, 4, 4]
      }
    ]
  },
  {
    label: "Objectifs",
    value: "8,147",
    percentage: "3.8%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,180,0,0.1)",
        borderColor: "rgb(255,180,0)",
        data: [2, 3, 3, 3, 4, 3, 3]
      }
    ]
  },
  {
    label: "Keys Results",
    value: "29",
    percentage: "2.71%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: [1, 7, 1, 3, 1, 4, 8]
      }
    ]
  },
  {
    label: "Taux",
    value: "17,281",
    percentage: "",
    increase: true,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: [3, 2, 3, 2, 4, 5, 4]
      }
    ]
  }
];
const QueryA = gql`query  {
  dashbordAdmin(company:"${localStorage.getItem('company')}"){
    numberTeam
    numberObjectif
    numberKeyResult
    numberMission
    taux
    missionComplet
    missionEnCour
    missionEnAttend
    progressTeam
    progressMission
    progressKeyResult
    progressObjectif
    
  }
}`;  
const QueryS = gql`query  {
  dashbordSuperviseur(id:"${localStorage.getItem('userId')}",company:"${localStorage.getItem('company')}"){
    numberTeam
    numberObjectif
    numberKeyResult
    numberMission
    taux
    missionComplet
    missionEnCour
    missionEnAttend
    progressTeam
    progressMission
    progressKeyResult
    progressObjectif
  }
}`;  
const QueryM = gql`query  {
  dashbordMember(id:"${localStorage.getItem('userId')}",company:"${localStorage.getItem('company')}"){
    numberTeam
    numberObjectif
    numberKeyResult
    numberMission
    taux
    missionComplet
    missionEnCour
    missionEnAttend
    progressTeam
    progressMission
    progressKeyResult
    progressObjectif
  }
}`; 
const status =CryptoJS.AES.decrypt(localStorage.getItem('status'), 'secret key 123').toString(CryptoJS.enc.Utf8);
let query= QueryM;
if(status==="admin"){ query=QueryA; }
else if(status==="superviseur"){ query=QueryS;}
class BlogOverview extends React.Component{

render(){
  return(
  <Query query= {query} >
  {({error, loading, data})=> {
    if (loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    if(status==="admin"){
      smallStats[0].value=data.dashbordAdmin.numberTeam;
      smallStats[0].percentage=data.dashbordAdmin.progressTeam.toFixed(2)+"%";
      if(data.dashbordAdmin.progressTeam>0){smallStats[0].increase=true}
      smallStats[1].value=data.dashbordAdmin.numberMission;
      smallStats[1].percentage=data.dashbordAdmin.progressMission.toFixed(2)+"%";
      if(data.dashbordAdmin.progressMission>0){smallStats[1].increase=true}
      smallStats[2].value=data.dashbordAdmin.numberObjectif;
      smallStats[2].percentage=data.dashbordAdmin.progressObjectif.toFixed(2)+"%";
      if(data.dashbordAdmin.progressObjectif>0){smallStats[2].increase=true}
      smallStats[3].value=data.dashbordAdmin.numberKeyResult;
      smallStats[3].percentage=data.dashbordAdmin.progressKeyResult.toFixed(2)+"%";
      if(data.dashbordAdmin.progressKeyResult>0){smallStats[3].increase=true}
      smallStats[4].value=data.dashbordAdmin.taux.toFixed(2)+"%";

    }else if(status==="superviseur"){
        smallStats[0].value=data.dashbordSuperviseur.numberTeam;
        smallStats[0].percentage=data.dashbordSuperviseur.progressTeam.toFixed(2)+"%";
        if(data.dashbordSuperviseur.progressTeam>0){smallStats[0].increase=true}
        smallStats[1].value=data.dashbordSuperviseur.numberMission;
        smallStats[1].percentage=data.dashbordSuperviseur.progressMission.toFixed(2)+"%";
        if(data.dashbordSuperviseur.progressMission>0){smallStats[1].increase=true}
        smallStats[2].value=data.dashbordSuperviseur.numberObjectif;
        smallStats[2].percentage=data.dashbordSuperviseur.progressObjectif.toFixed(2)+"%";
        if(data.dashbordSuperviseur.progressObjectif>0){smallStats[2].increase=true}
        smallStats[3].value=data.dashbordSuperviseur.numberKeyResult;
        smallStats[3].percentage=data.dashbordSuperviseur.progressKeyResult.toFixed(2)+"%";
        if(data.dashbordSuperviseur.progressKeyResult>0){smallStats[3].increase=true}
        smallStats[4].value=data.dashbordSuperviseur.taux.toFixed(2)+"%";
      
    }else if(status==="membre"){
      smallStats[0].value=data.dashbordMember.numberTeam;
      smallStats[0].percentage=data.dashbordMember.progressTeam.toFixed(2)+"%";
      if(data.dashbordMember.progressTeam>0){smallStats[0].increase=true}
      smallStats[1].value=data.dashbordMember.numberMission;
      smallStats[1].percentage=data.dashbordMember.progressMission.toFixed(2)+"%";
      if(data.dashbordMember.progressMission>0){smallStats[1].increase=true}
      smallStats[2].value=data.dashbordMember.numberObjectif;
      smallStats[2].percentage=data.dashbordMember.progressObjectif.toFixed(2)+"%";
      if(data.dashbordMember.progressObjectif>0){smallStats[2].increase=true}
      smallStats[3].value=data.dashbordMember.numberKeyResult;
      smallStats[3].percentage=data.dashbordMember.progressKeyResult.toFixed(2)+"%";
      if(data.dashbordMember.progressKeyResult>0){smallStats[3].increase=true}
      smallStats[4].value=data.dashbordMember.taux.toFixed(2)+"%";
    
  }
    
return(
 
 <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        {/* {(status === "superviseur") &&(<UsersOverview data={tableSuperviseur}/>)} */}
        <BestDeveloper />
      </Col>
       {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <UsersByDevice data={data} status={status}/>
      </Col>
    </Row>  
    <Row>
      {status==="admin" &&(
      <Col>
     <RapportChart/>
     </Col>
     )}
    </Row>      
  </Container>
);}}
</Query>
);}
}


export default BlogOverview;
