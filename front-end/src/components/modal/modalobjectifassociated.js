import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Progress,Button} from "shards-react"
import gql from "graphql-tag";
import { Query } from "react-apollo";
import './modalobjectif.css'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import '../../style/orgcharts.css';


const GET_MISSIONS_TREE = gql`query ($id: String!) {
  missiontreebyid(id:$id) {
  name
  description
  progression
  date_begin
  date_end
  creator {
    name
    avatar
    status
  }
  children {
    name
    description
    progression
    date_begin
    date_end
    creator {
    name
    avatar
    status
  }
  }

}

}`;

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false};
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleSubmit(event) {
    event.preventDefault();
     }     
  render() {
   let id = this.props.data;
  
return (
   <Query query={GET_MISSIONS_TREE} pollInterval={5000} variables={{id}}>
    {({ loading, error, data }) => {



      const MyNodeComponent = ({node}) => {
        let datestart = new Date(node.date_begin);
        let dateend = new Date(node.date_end);
        let montend = dateend.getMonth() ;
        let actmontend = montend+1 ;
        let montstart = datestart.getMonth() ;
        let actmonntst = montstart+1 ;
   

        return (
          <div>
          
          <div className="initechNode" >
            <div>
          <div className="enteteTitle">
           <p >{node.name}</p>

            <img className="enteteImage"  src={require(`../../images/avatars/${node.creator.avatar}`)} alt="avatar"/>
            </div>
            <div>
            <p> date begin : {datestart.getFullYear()+"-"+actmonntst +"-"+datestart.getDate()}</p>
            <p>date end : {dateend.getFullYear()+"-"+actmontend +"-"+dateend.getDate()}</p>
            { dateend < this.state.today && <p className="text-danger"> expired !</p>}
            </div>

    <Progress theme="success" value={node.progression}><span className="progressValue">{node.progression.toFixed(2)}%</span></Progress>
        </div>  

       
        
        <Modal open={this.state.open} toggle={this.toggle}>
          <ModalHeader>{this.state.name}</ModalHeader>
        </Modal>
        </div>
        </div>
        );
      };
      
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <div>       
        <Button theme="success" outline onClick={this.toggle}>Objectifs Linked</Button>
        <Modal size="lg" isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
         
          <div id="wrapper">
       
          <div class="force-overflow"></div> 

          <OrgChart tree={data.missiontreebyid} NodeComponent={MyNodeComponent}/>
          <ModalFooter>
            <Button theme="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </div>
        
          </form>
        </Modal>
        </div>

        
        );

      }
    }

    </Query>
);
  
}
}