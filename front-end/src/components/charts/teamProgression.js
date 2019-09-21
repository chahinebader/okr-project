import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody} from "shards-react";
// import Chart from "../../utils/chart";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Chart } from "react-google-charts";
const STAR_Query= gql`
query{
    TeamProgression{
        userId
        name
        progression
      }
  }
`;

    let data = [];
const listTeam =() =>(
    <Query query={STAR_Query}>
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>Error...</div>
     return(
          <TeamOverview data={data.TeamProgression}/>
     );}}
     </Query>
);
class TeamOverview extends React.Component {
  constructor(props) {
    super(props);
    let label=["Team List"];
    let dataset=[this.props.data.length];
    for(let item of this.props.data){
        label.push(item.name);
        dataset.push(item.progression);
        // chartData.datasets[0].data.push(item.progression);
        // chartData.labels.push(item.name);
    }
    data[0]=label;
    data[1]=dataset;
   
    this.canvasRef = React.createRef();
  }

  

  render() {
   
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Team Progression</h6>
        </CardHeader>
        <CardBody className="pt-0">
        <Chart
           chartType="Bar"
           data={data}
           width="100%"
           height="350px"
           legendToggle
         />
          {/* <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          /> */}
        </CardBody>
      </Card>
    );
  }
}

TeamOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

TeamOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Current Month",
        fill: "start",
        data: [
          500,
          800,
          320,
          180,
          240,
          320,
          230,
          650,
          590,
          1200,
          750,
          940,
          1420,
          1200,
          960,
          1450,
          1820,
          2800,
          2102,
          1920,
          3920,
          3202,
          3140,
          2800,
          3200,
          3200,
          3400,
          2910,
          3100,
          4250
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      },
      {
        label: "Past Month",
        fill: "start",
        data: [
          380,
          430,
          120,
          230,
          410,
          740,
          472,
          219,
          391,
          229,
          400,
          203,
          301,
          380,
          291,
          620,
          700,
          300,
          630,
          402,
          320,
          380,
          289,
          410,
          300,
          530,
          630,
          720,
          780,
          1200
        ],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
      }
    ]
  }
};

export default listTeam;
