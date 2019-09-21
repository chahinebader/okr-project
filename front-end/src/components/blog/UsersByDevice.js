import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";
let chartData= {
title: "Users by device",
chartData: {
  datasets: [
    {
      hoverBorderColor: "#ffffff",
      data: [0, 0, 100],
      backgroundColor: [
        "#5BB228",
        "rgba(0,123,255,0.9)",
        "#E37E20"
      ]
    }
  ],
  labels: ["Completed", "On Progress", "Pending"]
}};
class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
  
   
   if(props.status ==="admin"){
     chartData.title="All Missions Chart";
   if((props.data.dashbordAdmin.missionComplet+props.data.dashbordAdmin.missionEnCour+props.data.dashbordAdmin.missionEnAttend)===100) {
   
    chartData.chartData.datasets[0].data=[props.data.dashbordAdmin.missionComplet,props.data.dashbordAdmin.missionEnCour,props.data.dashbordAdmin.missionEnAttend];
    }
  }
    
   else if(props.status ==="superviseur"){
     chartData.title="My Objectifs Chart";
     
     if((props.data.dashbordSuperviseur.missionComplet+props.data.dashbordSuperviseur.missionEnCour+props.data.dashbordSuperviseur.missionEnAttend)===100) {
     
      chartData.chartData.datasets[0].data=[props.data.dashbordSuperviseur.missionComplet,props.data.dashbordSuperviseur.missionEnCour,props.data.dashbordSuperviseur.missionEnAttend];
     }
    }
    else if(props.status ==="membre"){
      chartData.title="My Keys Result Chart";
      if(props.data.dashbordMember){
      chartData.chartData.datasets[0].data=[props.data.dashbordMember.missionComplet,props.data.dashbordMember.missionEnCour,props.data.dashbordMember.missionEnAttend];
      }
    }
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    
    const chartConfig = {
      type: "pie",
      data: chartData.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = chartData;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="250"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};



export default UsersByDevice;
