import React from 'react';
import './style.scss';
import {Navbar, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {FaHome, FaSearch, FaPlusCircle, FaFire} from 'react-icons/fa';

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
      <Navbar color="light" light>
            <NavLink href="#"><FaHome/></NavLink>
            <NavLink href="#"><FaFire/></NavLink>
            <NavLink href="#" onClick={this.toggleNewPost}><FaPlusCircle/></NavLink>
            <NavLink href="#"><FaSearch/></NavLink>
      </Navbar>
      </div>
    )
  }
}
export default Footer;
