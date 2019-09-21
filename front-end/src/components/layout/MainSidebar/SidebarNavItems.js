import React from "react";
import { Nav } from "shards-react";
import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";
import CryptoJS from 'crypto-js';

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navItems: Store.getSidebarItems(CryptoJS.AES.decrypt(localStorage.getItem('status'), 'secret key 123').toString(CryptoJS.enc.Utf8))
    };

    this.onChange = this.onChange.bind(this);
  
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
