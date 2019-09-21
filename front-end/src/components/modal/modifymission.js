import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Fade } from "shards-react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import "./modifymission.css";

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: this.props.data.title,
      description: this.props.data.description,
      date_begin: null,
      date_end: null
    };
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
    let title;
    let description;
    let date_begin;
    let date_end;
    let id = this.props.data._id;
    const MISSION = gql`
      query missionbyid($id: String!) {
        missionbyid(id: $id) {
          _id
          title
          description
          date_begin
          date_end
        }
      }
    `;
    const UPDATE_MISSION = gql`
      mutation updateMission(
        $_id: String!
        $title: String!
        $description: String!
        $date_begin: String!
        $date_end: String!
      ) {
        updateMission(
          missionInputUpdate: {
            _id: $_id
            title: $title
            description: $description
            date_begin: $date_begin
            date_end: $date_end
          }
        ) {
          _id
          title
          description
          date_begin
          date_end
        }
      }
    `;
    return (
      <Query query={MISSION} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error...</div>;
          return (
            <div>
              <Button
                theme="warning"
                className="modify-button "
                outline
                onClick={this.toggle}
              >
                <i className="fas fa-pencil-alt" />
              </Button>
              <Mutation mutation={UPDATE_MISSION}>
                {ModifyMission => (
                  <Modal isOpen={this.state.modal}>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        ModifyMission({
                          variables: {
                            _id: this.props.data._id,
                            title: title.value,
                            description: description.value,
                            date_begin: date_begin.value,
                            date_end: date_end.value
                          }
                        });
                        title.value = "";
                        description.value = "";
                        date_begin.value = "";
                        date_end.value = "";
                      }}
                    >
                      <div>
                        <ModalHeader>Modify mission</ModalHeader>
                        <div class="force-overflow" />
                        <ModalBody>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <span className="title-label-modify-mission">
                                title:{" "}
                              </span>
                            </div>
                            <span>
                              <input
                                type="textarea"
                                placeholder=""
                                className="title-input"
                                ref={node => {
                                  title = node;
                                }}
                                defaultValue={this.props.data.title}
                                onChange={e => {
                                  this.setState({ title: e.target.value });
                                }}
                              />
                            </span>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <span className="description-label-modify-mission">
                                description:{" "}
                              </span>
                            </div>
                            <span>
                              <textarea
                                type="textarea"
                                placeholder=""
                                className="title-input"
                                ref={node => {
                                  description = node;
                                }}
                                defaultValue={this.props.data.description}
                                onChange={e => {
                                  this.setState({
                                    description: e.target.value
                                  });
                                }}
                              />
                            </span>
                          </div>
                          <div className="date-begin-modify-mession">
                            <div className="date-label-keyresult">
                              <span>start:</span>
                            </div>
                            <span className="span-date-end">
                              <input
                                type="date"
                                className="date-input-keyresult"
                                ref={node => {
                                  date_begin = node;
                                }}
                                id="date-begin"
                                onChange={e => {
                                  this.setState({ date_begin: e.target.value });
                                }}
                                value={this.props.data.date_begin.toISOString}
                              />
                            </span>
                          </div>
                          <div className="date-end-modify-mession">
                            <div className="date-label-keyresult">
                              <span>end:</span>
                            </div>
                            <span className="span-date-end">
                              <input
                                type="date"
                                className="date-input-keyresult"
                                ref={node => {
                                  date_end = node;
                                }}
                                defaultValue={this.props.data.date_end}
                                id="date-end"
                                onChange={e => {
                                  this.setState({ date_end: e.target.value });
                                }}
                              />
                            </span>
                          </div>
                          <div>
                            {this.state.title.length < 6 && (
                              <Fade>
                                title must be longer than 6 characters
                              </Fade>
                            )}
                            {this.state.description.length < 12 && (
                              <Fade>
                                description must be longer than 12 characters
                              </Fade>
                            )}
                            {this.state.date_begin === null &&
                              this.state.date_end === null && (
                                <Fade>
                                  You must choose a begin and end date
                                </Fade>
                              )}
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <Button theme="danger" onClick={this.toggle}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            theme="success"
                            onClick={this.toggle}
                          >
                            Associate Team
                          </Button>
                        </ModalFooter>
                      </div>
                    </form>
                  </Modal>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}
