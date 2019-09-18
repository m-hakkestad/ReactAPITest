import React from 'react';
import './style.scss';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {FaTwitter} from 'react-icons/fa';

class Header extends React.Component{
  constructor(props){
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    return(
      <div className="Header">
        <Navbar color="light" light>
          <NavbarBrand href="/" className="mr-auto"><FaTwitter className="Header-icon"/>Twuttur</NavbarBrand>
        </Navbar>
      </div>
    )
  }
}
export default Header;
