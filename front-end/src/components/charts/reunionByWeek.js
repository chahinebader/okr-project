import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Row,
  Col
} from "shards-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
const STAR_Query= gql`
query{
    ReunionInWeek(company:"${localStorage.getItem('company')}"){
        _id
        title
        start
        creator {
          _id
          name
          avatar
          status
        }
        team{
          _id
          name
          color
        }
      }
  }
`;
const listReunion =() =>(
    <Query query={STAR_Query}>
     {({ data, loading,error }) => {
     if (loading) return <div>Loading...</div>
     if(error) return <div>Error...</div>
     return(
          <ReunionByWeek data={data.ReunionInWeek}/>
     );}}
     </Query>
);
class ReunionByWeek extends React.Component{

     dateDisplay(date: String){
        var d= new Date(date);
        var display =d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDay()+" at "+d.getHours()+":"+d.getMinutes();
        return display;
      }
    render(){
        return(

  <Card small className="blog-comments">
    <CardHeader className="border-bottom">
      <h6 className="m-0">List Reunion in this week</h6>
    </CardHeader>

    <CardBody className="p-0">
      {this.props.data.map((item, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img src={require(`../../images/avatars/${item.creator.avatar}`)} alt={item.creator.name} />
          </div>

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
              
              <span className="text-mutes">Title: {item.title}</span>
            </div>

            {/* Content :: Body */}
            <p className="m-0 my-1 mb-2 text-muted">Associeted to: {item.team.name}</p>
            <p className="m-0 my-1 mb-2 text-muted">date: {this.dateDisplay(item.start)}</p>
            <p className="text-secondary" >created by: {item.creator.name}-{item.creator.status}</p>
           
            {/* Content :: Actions */}
           
          </div>
        </div>
      ))}
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All Comments
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
            
            )
        }
    }


    ReunionByWeek.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  ReunionByWeek: PropTypes.array
};

ReunionByWeek.defaultProps = {
  title: "Discussions",
  discussions: [
    {
      id: 1,
      date: "3 days ago",
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "Well, the way they make shows is, they make one show ..."
    },
    {
      id: 2,
      date: "4 days ago",
      author: {
        image: require("../../images/avatars/2.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "After the avalanche, it took us a week to climb out. Now..."
    },
    {
      id: 3,
      date: "5 days ago",
      author: {
        image: require("../../images/avatars/3.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "My money's in that office, right? If she start giving me..."
    }
  ]
};

export default listReunion;