import React from 'react';
import './style.scss';
import {Navbar, NavLink} from 'reactstrap';

import {FaHome, FaPlusCircle, FaFire} from 'react-icons/fa';

class Footer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.toggleNewPost = this.toggleNewPost.bind(this);
  }

  toggleNewPost(){
    this.props.onChange();
  }

  render(){
    return(
      <div className="Footer">
      <Navbar color="light" light className="Footer-nav">
            <NavLink href="/" className="Footer-nav-link"><FaHome/></NavLink>
            <NavLink href="#" onClick={this.toggleNewPost} className="Footer-nav-link"><FaPlusCircle/></NavLink>
            <NavLink href="/hot" className="Footer-nav-link"><FaFire/></NavLink>
      </Navbar>
      </div>
    )
  }
}
export default Footer;
