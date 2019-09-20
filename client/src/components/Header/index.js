import React from 'react';
import './style.scss';
import { Navbar, NavbarToggler, NavbarBrand} from 'reactstrap';
import {FaTwitter} from 'react-icons/fa';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Header extends React.Component{
  constructor(props){
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      title: ""
    };
  }

  componentDidMount(){
    if(history.location.pathname === '/'){
      this.setState({
        title:"New"
      })
    }else if(history.location.pathname === '/hot'){
      this.setState({
        title:"Hot"
      })
    }
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
          <NavbarBrand href="/" className="mr-auto"><FaTwitter className="Header-icon"/>Twuttur / {this.state.title}</NavbarBrand>
        </Navbar>
      </div>
    )
  }
}
export default Header;
