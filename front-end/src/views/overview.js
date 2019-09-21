import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import 'react-circular-progressbar/dist/styles.css';
import '../style/overview.css';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import '../style/orgcharts.css';
import { Card, CardBody, CardTitle, Progress ,Modal, ModalBody, ModalHeader} from "shards-react";


const GET_MISSIONS_TREE = gql`query  {    
missiontree(company:"${localStorage.getItem('company')}")  {
  _id
  name
  progression
  description
  date_begin
  date_end
  creator {
    _id
    name
    avatar
    status
  }
  children {
    _id
    name
    description
    progression
    date_begin
    date_end
    team {
        name
      }
    children {
      _id
      name
      progression
      description
      date_begin
      date_end
      member {
        name
        avatar
      }

    }
  }
  
}

  }
`;



class Overview extends React.Component {
  

  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isHovering: false,
      open: false,
      name: "ok",
      description: "ok",
      today : new Date ()
    };

  }
  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }
  toggle() {
    this.setState({
      open: !this.state.open,
    });
    }
    modalvalue(name,description) {
      this.setState({
        name: name,
        description: description,
        open: !this.state.open,
      });
      }

 

  render() { 

    const missiontree = ()=> (
    <Query query={GET_MISSIONS_TREE}>
    {({ loading, error, data }) => {
       if (loading) return "Loading...";
       if (error) return `Error! ${error.message}`;
      const MyNodeComponent = ({node}) => {
      //   let datestart = new Date(node.date_begin); for popup on click or on hover to display details
      //   let dateend = new Date(node.date_end);
      //   let montend = dateend.getMonth() ;
      //  let actmontend = montend+1 ; 
      //  let montstart = datestart.getMonth() ;
      //   let actmonntst = montstart+1 ;
   

        return (
          <div onClick={() => this.modalvalue(node.name,node.description)}>
          
          <div className="initechNode" >
            <div>
          <div className="enteteTitle">
           <p >{node.name}</p>
           { node.creator !==undefined &&  (<img className="enteteImage"  src={require(`../images/avatars/${node.creator.avatar}`)} alt="avatar"/>
           )}
            </div>
            {/* team name */}
            <div className="body-orgchart">
              
    <Progress theme="success" value={node.progression}><span className="progressValue">{node.progression.toFixed(2)}%</span></Progress>
            {(node.team !==undefined && node.team !==null) && (
            <div className="overview-separation">
            <p className="overview-team-style">{node.team.name}</p>
            </div>)}


           </div>
           <div className="footer-orgchart">
            {/* member name */}
            {(node.member !==undefined && node.member !==null) && (
            <div className="overview-separation">
            <p className="overview-member-style">{node.member.name}</p>
            <img className="enteteImage"  src={require(`../images/avatars/${node.member.avatar}`)} alt="avatar"/>
            </div>)}  

           </div>
            {/* <div>
            <p> date begin : {datestart.getFullYear()+"-"+actmonntst +"-"+datestart.getDate()}</p>
            <p>date end : {dateend.getFullYear()+"-"+actmontend +"-"+dateend.getDate()}</p>
            { dateend < this.state.today && <p className="text-danger"> expired !</p>}
            </div> */}
        </div>  

       
        
        <Modal open={this.state.open} toggle={this.toggle}>
          <ModalHeader>{this.state.name}</ModalHeader>
          <ModalBody>{this.state.description}</ModalBody>
        </Modal>
        </div>
        </div>
        );
      };
      
      

      return (
        <div>
          <div className="App" id="initechOrgChart">
          <Card>
          <div id="wrapperOverview">
          <div class="scrollbarOverview" id="style-default">
        {data.missiontree.map (mission =>
        
         (
          
      <CardBody>
        <CardBody>
          <CardTitle>
          <div>
          <OrgChart tree={mission} NodeComponent={MyNodeComponent}  >
            </OrgChart>
            </div>
            
          </CardTitle>
         
          </CardBody>
          </CardBody>
   
        ))}
        <br></br>
       </div>
       </div>
        </Card>
        
        </div>
        </div>
        
        );

      }
    }

    </Query>
    )
     return missiontree();
   

    }
    
  }

export default Overview;
