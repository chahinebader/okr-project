import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const STAR_Query = gql`
query {
  topFiveNotfications(id:"5c6bfec8e5001a2c7cb08ad4"){
    _id
    title
    description
    date_send  
  }
}
`;
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <Query query={STAR_Query} pollInterval={5000} >
      {({ data, loading,error }) => {
      if (loading) return <div>Loading...</div>
      if(error) return <div>Error...</div>
      
       return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
            {data.topFiveNotfications.length}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
        className="dropdown-menu dropdown-menu-small">
         {data.topFiveNotfications.map(item => (
          <DropdownItem key={item._id}>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
              <i className="material-icons clear_all">&#xe0b8;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">{item.title}</span>
              <p>
                {item.description}{" "}
                <span className="text-success text-semibold">28%</span> in the
                last week. Great job!
              </p>
            </div>
          </DropdownItem>
         ))}
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Sales</span>
              <p>
                Last week your store’s sales count decreased by{" "}
                <span className="text-danger text-semibold">5.52%</span>. It
                could have been worse!
              </p>
            </div>
          </DropdownItem> */}
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
       )}}
       </Query>
    );
  }
}
