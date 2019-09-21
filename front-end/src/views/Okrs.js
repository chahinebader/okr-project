import React from "react";
import {
  CardHeader, CardBody, Button,
  ListGroupItem,
  Row,
  Col,
  Slider,
  Collapse,
  FormTextarea,
  Form
} from "shards-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card } from 'semantic-ui-react';
import PageTitle from "../components/common/PageTitle";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import '../style/okr.css';

const GET_OKR = gql`
  query($userid: String!) {
    keyresultsbyuserid(userid: $userid) {
      _id
      title
      description
      date_begin
      date_end
      progression
      level
      visibility
      commentaires {
        _id
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
const ADD_COMMMENT = gql`
  mutation AddComment ($content: String!,$creator: String!, $keyResult: String!) {
      
      createCommentaire (commentaireInput:{content:$content,creator:$creator,keyResult:$keyResult}) {
    content
  }
  }
`;
const UPDATE_OKR = gql`
  mutation updateokr(
    $_id: String!
    $title: String!
    $description: String!
    $date_begin: String!
    $date_end: String!
    $visibility: Boolean!
    $level: Int!
    $progression: Int!
    $userid: String!
    $mycompany: String!
  ) {
    updateKeyresult(
      keyresultInputUpdate: {
        _id: $_id
        title: $title
        description: $description
        date_begin: $date_begin
        date_end: $date_end
        visibility: $visibility
        level: $level
        progression: $progression
      },
      userid: $userid,
      mycompany: $mycompany
    ) {
      title
      description
      progression
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
let compte = 0;
let mycompany = localStorage.getItem('company');
class Okr extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.modaldelete = this.modaldelete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { value: 50, newval: null,collapse: false, item: null,content: '' ,modaldelete: false };

  }
  modaldelete() {
    this.setState({
      modaldelete: !this.state.modaldelete
    });
  };

  handleSlide(e) {
    this.setState({
      value: parseInt(e[0]),
      newval: parseInt(e[0])
    });
  }
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
    let currentslide = {};

    return (
      <div>
        <Row noGutters className="text-right">
          <PageTitle
            title="My Key-Results"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>

        <ListGroupItem className="okr-card">
          <Card.Group itemsPerRow={2}>
            <Query query={GET_OKR} pollInterval={1000} variables={{ userid }} >
              {({ loading, error, data }) => {
                if (loading) return <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>;
                if (error) return <p>Error :(</p>;
                return data.keyresultsbyuserid.map(
                  ({
                    _id,
                    title,
                    description,
                    date_begin,
                    date_end,
                    level,
                    visibility,
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
                      <Mutation
                        mutation={UPDATE_OKR}
                        variables={{mycompany}}
                        key={_id}
                        update={(cache, { data: { updateokr } }) => {
                          const okrs = cache.readQuery({ query: GET_OKR });
                          cache.writeQuery({
                            query: GET_OKR,
                            data: { keyresults: okrs.okrresults }
                          });
                        }}
                      >
                        {(updateokr, { data }) => (
                          <Card>
                            <CardHeader>
                              <Row>
                                <Col>
                                  <label className="title">{title}</label>
                                </Col>
                                <Col>
                                    {!(diff <= 0) && <span> days remaining: {diff}</span>}

                                    {(diff <= 0) && <span className="text-danger"> expired !</span>}
                                  </Col>
                                <Col>
                                  <div className="visibility-okr">
                                    {visibility && <Button theme="secondary" outline>  <i class="fas fa-globe"></i> public </Button>}
                                    {!visibility && <Button theme="secondary" outline>  <i class="fas fa-users"></i> private </Button>}
                                  </div>
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
                                  <div >
                                    <Slider
                                      tooltips
                                      ref={_id}
                                      theme="success"
                                      steps={1}
                                      pips={{
                                        mode: "steps",
                                        stepped: true,
                                        density: 3
                                      }}
                                      disabled= {diff <= 0}
                                      connect={[true, false]}
                                      start={[progression]}
                                      range={{ min: 0, max: 100 }}
                                      onSlide={e => {
                                        [progression] = e[0];
                                        currentslide = {
                                          id: _id,
                                          value: parseInt(e[0])
                                        };
                                      }}
                                    />
                                  </div>
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
                              <div
                                onClick={e => {
                                  updateokr({
                                    variables: {
                                      _id: _id,
                                      title: title,
                                      description: description,
                                      date_begin: date_begin,
                                      date_end: date_end,
                                      visibility: visibility,
                                      level: level,
                                      progression: currentslide.value,
                                      userid: localStorage.getItem('userId'),
                                    }

                                  });
                                }}
                              >
                                <div>
                                  <button
                                    type="submit"
                                    className="btn btn-accent"
                                  >
                                    Update
                                      </button>
                                  <Button onClick={(e) => this.toggle(_id)}>Display comments</Button>
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
                                  <Mutation mutation={ADD_COMMMENT}>
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
                              </div>
                            </CardBody>
                          </Card>
                        )}
                      </Mutation>
                    );
                  }
                );
              }}
            </Query>
          </Card.Group>
        </ListGroupItem>

      </div>
    );
  }
}

export default Okr;
