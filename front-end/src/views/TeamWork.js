import React from "react";
import {
  CardHeader, CardBody, Button,
  ListGroupItem,
  Row,
  Col,
  Collapse,
  FormTextarea,
  Form,
  Progress
} from "shards-react";
import { Mutation } from "react-apollo";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CryptoJS from 'crypto-js';
const GET_SUPERVISOR_KR = gql`
  query($userid: String!) {
    supervisorkeyresults(userid: $userid) {
    _id
    title
    description
    date_begin
    date_end
    progression
    commentaires {
      content
      date
      creator {
        name
        avatar
      }
    }  
  }
  }
`;  
const GET_KR_MEMBERS = gql`
  query($userid: String!) {
    keyresultsofmembers(userid: $userid){
    _id
    title
    description
    date_begin
    date_end
    progression
    commentaires {
      content
      date
      creator {
        name
        avatar
      }
    }
  }
  }
`;
const DELETE_TODO = gql`
mutation deleteComment($_id: String!) {
  deleteCommentaire(idcomment: $_id) {
    
    content
  }
}
`;
const ADD_COMMMENT = gql`
  mutation AddComment ($content: String!,$creator: String!, $keyResult: String!) {
      
      createCommentaire (commentaireInput:{content:$content,creator:$creator,keyResult:$keyResult}) {
    content
  }
  }
`;
let compte = 0;
const status =CryptoJS.AES.decrypt(localStorage.getItem('status'), 'secret key 123').toString(CryptoJS.enc.Utf8);
const currentuser = localStorage.getItem('userId');
class TeamWork extends React.Component {
    constructor(props) {
        super(props);
        this.modaldelete = this.modaldelete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false, item: null,content: '' ,modaldelete: false };
    
      }
      modaldelete() {
        this.setState({
          modaldelete: !this.state.modaldelete
        });
      };
      toggle(id) {
        if (this.state.item === id && compte === 1) {
          compte = 0;
          this.setState({ item: null });
        } else if (this.state.item !== id) {
          compte = 1;
          this.setState({ item: id });
        }
      }

    render() {
        let userid = localStorage.getItem("userId");
        return (  
            <div>
            {(status ==="superviseur")&&(
                        <div>
                        <ListGroupItem className="okr-card">
                          <Card.Group itemsPerRow={2}>
                          <Query query={GET_SUPERVISOR_KR} pollInterval={5000} variables={{ userid }} >
                              {({ loading, error, data }) => {
                                if (loading) return <div class="spinner-border" role="status">
                                  <span class="sr-only">Loading...</span>
                                </div>;
                                if (error) return <p>Error :(</p>;
                                    return data.supervisorkeyresults.map(
                                        ({
                                          _id,
                                          title,
                                          description,
                                          date_begin,
                                          date_end,
                                          progression,
                                          commentaires,
                                        }) => {
                                            let datestart = new Date(date_begin);
                                            let d = Date(Date.now());
                                            let dateend = new Date(date_end);
                                            let montend = dateend.getMonth();
                                            let actmontend = montend + 1;
                                            let montstart = datestart.getMonth();
                                            let actmonntst = montstart + 1;
                                            let diff = Math.floor((Date.parse(dateend) - Date.parse(d)) / 86400000);
                                            return (
                                                <Card key={_id}>
                                                <CardHeader>
                                                  <Row>
                                                    <Col>
                                                      <label className="title">{title}</label>
                                                    </Col>
                                                    <Col>
                                        {!(diff <= 0) && <span> days remaining: {diff} day(s)</span>}
    
                                        {(diff <= 0) && <span className="text-danger"> expired !</span>}
                                      </Col>
                                                    
                                                  </Row>
                                                </CardHeader>
                                                <CardBody>
                                                  <Col>
                                                    <Row>
                                                      <label className="description-okr">
                                                        {description}
                                                      </label>
                                                    </Row>
                                                    
                                                  </Col>
                                                  <div className="dates-label">
                                                  <Col>
                                                  <Progress theme="success" value={progression}>{progression}%</Progress>
                                                  </Col>
                                                    <Col className="text-right">
                                                      <Row>
                                                        <span className="date-begin-okr"> begin  {datestart.getFullYear() + "-" + actmonntst + "-" + datestart.getDate()}</span>
                                                      </Row>
                                                      <Row>
                                                        <span className="date-end-okr"> finish  {dateend.getFullYear() + "-" + actmontend + "-" + dateend.getDate()}</span>
                                                      </Row>
                                                    </Col>
                                                  </div>
                                                    <div>
                                                        
                                                      <Button onClick={(e) => this.toggle(_id)}>{commentaires.length} comments<i class="far fa-comments"></i>See comments</Button>
                                                    </div>
                                                    <Collapse open={this.state.item === _id} key={_id}>
                                                      <div className="p-3 mt-3 border rounded">
                                                        {commentaires.length === 0 && <span> no comments on this key result </span>}
                                                        {commentaires.map(({                                     
                                                          _id,
                                                          content,
                                                          date,
                                                          creator
                                                        }) => {
                                                          let datecomment = new Date(date);
                                                          return (
                                                            <div>
                                                            <div>
                                                            <div className="comment-content">
                                                              <img className="image-comment"  src={require(`../images/avatars/${creator.avatar}`)} alt="avatar"/>
                                                              <span className="commentor-name"> {creator.name}</span>
                                                              <span className="comment-creator">at &nbsp; {datecomment.getDate() + "-" + datecomment.getMonth() + "-" + datecomment.getFullYear()}</span>
                                                              {(currentuser === creator)&&(
                                                              <div className="delete-comment">
                                                            <Modal isOpen={this.state.modaldelete}>
                                                            <Mutation mutation={DELETE_TODO} key={_id}>
                                                     {deleteComment =>(
                                                    <Form onSubmit={e => {         
                                                      e.preventDefault();  
                                                      console.log(_id)          
                                                    deleteComment({ variables: { _id } }); 
                                                    this.setState({modaldelete:false});            
                                                    }}>
                                                    <ModalHeader>Alert</ModalHeader>
                                                   
                                                    <ModalBody>
                                                      <span>Are You Sur To Delete This Comment ?</span>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                     <Button  theme="accent" type="submit">Yes</Button>
                                                      <Button theme="danger" onClick={this.toggle}>Cancel</Button>
                                                    </ModalFooter>
                                                    </Form>
                                                     )}
                                                     </Mutation> 
                                                            </Modal>
                                                            <Button theme="light" outline className="delete-button" onClick={this.modaldelete}><i class="fas fa-times"></i></Button>  
                                                            </div>
                                                              )
                                                            }
                    
                                                              <span className="comment-description">
                                                                <br />
                                                                {content}
                                                              </span>
                                                            </div>
                                                            <br/>
                                                            </div>
                                                            
                    
                                                            </div>
                    
                    
                    
                                                          )
                                                        })}
                                                      </div>
                                                      <Mutation mutation={ADD_COMMMENT} key={_id}>
                                                        {AddComment => (
                                                          <form onSubmit={e => {
                                                            AddComment({ variables: { content: this.state.content, creator: localStorage.getItem("userId"), keyResult: _id } });
                                                            e.preventDefault();
                                                            this.setState({ content: "" });
                                                          }}>
                                                            <FormTextarea placeholder="write a comment" value={this.state.content} className="mb-2" onChange={e => { this.setState({ content: e.target.value }) }} />
                                                            <Button type="submit"> send</Button>
                                                          </form>
                                                        )}
                                                      </Mutation>
                                                    </Collapse>
                                                  
                                                </CardBody>
                                              </Card>
                
                                            )
                                        })
                                }
                            }
                            </Query>
                            </Card.Group>
                            </ListGroupItem>
                            </div> 
            )}
          


            {(status ==="membre")&&(
            <div>
        <ListGroupItem className="okr-card">
          <Card.Group itemsPerRow={2}>
          <Query query={GET_KR_MEMBERS} pollInterval={5000} variables={{ userid }} >
              {({ loading, error, data }) => {
                if (loading) return <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>;
                if (error) return <p>Error :(</p>;
                    return data.keyresultsofmembers.map(
                        ({
                          _id,
                          title,
                          description,
                          date_begin,
                          date_end,
                          progression,
                          commentaires,
                        }) => {
                            let datestart = new Date(date_begin);
                            let d = Date(Date.now());
                            let dateend = new Date(date_end);
                            let montend = dateend.getMonth();
                            let actmontend = montend + 1;
                            let montstart = datestart.getMonth();
                            let actmonntst = montstart + 1;
                            let diff = Math.floor((Date.parse(dateend) - Date.parse(d)) / 86400000);
                            return (
                                <Card key={_id}>
                                <CardHeader>
                                  <Row>
                                    <Col>
                                      <label className="title">{title}</label>
                                    </Col>
                                    <Col>
                                        {!(diff <= 0) && <span> days remaining: {diff} day(s)</span>}
    
                                        {(diff <= 0) && <span className="text-danger"> expired !</span>}
                                      </Col>
                                  </Row>
                                </CardHeader>
                                <CardBody>
                                  <Col>
                                    <Row>
                                      <label className="description-okr">
                                        {description}
                                      </label>
                                    </Row>
                                    
                                  </Col>
                                  <div className="dates-label">
                                  <Col>
                                  <Progress theme="success" value={progression}>{progression}%</Progress>
                                  </Col>
                                    <Col className="text-right">
                                      <Row>
                                        <span className="date-begin-okr"> begin  {datestart.getFullYear() + "-" + actmonntst + "-" + datestart.getDate()}</span>
                                      </Row>
                                      <Row>
                                        <span className="date-end-okr"> finish  {dateend.getFullYear() + "-" + actmontend + "-" + dateend.getDate()}</span>
                                      </Row>
                                     
                                    </Col>
                                  </div>
                                    <div>
                                    <Button onClick={(e) => this.toggle(_id)}>{commentaires.length} comments<i class="far fa-comments"></i></Button>
                                    </div>
                                    <Collapse open={this.state.item === _id} key={_id}>
                                      <div className="p-3 mt-3 border rounded">
                                        {commentaires.length === 0 && <span> no comments on this key result </span>}
                                        {commentaires.map(({                                     
                                          _id,
                                          content,
                                          date,
                                          creator
                                        }) => {
                                          let datecomment = new Date(date);
                                          return (
                                            <div key={_id}>
                                            <div>
                                            <div className="comment-content">
                                              <img className="image-comment"  src={require(`../images/avatars/${creator.avatar}`)} alt="avatar"/>
                                              <span className="commentor-name"> {creator.name}</span>
                                              <span className="comment-creator">at &nbsp; {datecomment.getDate() + "-" + datecomment.getMonth() + "-" + datecomment.getFullYear()}</span>
                                              {(currentuser === creator)&&(
                                              <div className="delete-comment">
                                            <Modal isOpen={this.state.modaldelete}>
                                            <Mutation mutation={DELETE_TODO} key={_id}>
                                     {deleteComment =>(
                                    <Form onSubmit={e => {         
                                      e.preventDefault();  
                                      console.log(_id)          
                                    deleteComment({ variables: { _id } }); 
                                    this.setState({modaldelete:false});            
                                    }}>
                                    <ModalHeader>Alert</ModalHeader>
                                   
                                    <ModalBody>
                                      <span>Are You Sur To Delete This Comment ?</span>
                                    </ModalBody>
                                    <ModalFooter>
                                     <Button  theme="accent" type="submit">Yes</Button>
                                      <Button theme="danger" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                    </Form>
                                     )}
                                     </Mutation> 
                                            </Modal>
                                            <Button theme="light" outline className="delete-button" onClick={this.modaldelete}><i class="fas fa-times"></i></Button>  
                                            </div>
                                              )
                                            }
    
                                              <span className="comment-description">
                                                <br />
                                                {content}
                                              </span>
                                            </div>
                                            <br/>
                                            </div>
                                            
    
                                            </div>
    
    
    
                                          )
                                        })}
                                      </div>
                                      <Mutation mutation={ADD_COMMMENT} key={_id}>
                                        {AddComment => (
                                          <form onSubmit={e => {
                                            AddComment({ variables: { content: this.state.content, creator: localStorage.getItem("userId"), keyResult: _id } });
                                            e.preventDefault();
                                            this.setState({ content: "" });
                                          }}>
                                            <FormTextarea placeholder="write a comment" value={this.state.content} className="mb-2" onChange={e => { this.setState({ content: e.target.value }) }} />
                                            <Button type="submit"> send</Button>
                                          </form>
                                        )}
                                      </Mutation>
                                    </Collapse>
                                  
                                </CardBody>
                              </Card>

                            )
                        })
                }
            }
            </Query>
            </Card.Group>
            </ListGroupItem>
            </div> 

        )
    }
    </div>
        )

}
}
export default TeamWork;