import React from 'react';
import './style.scss';
import {Navbar, NavLink } from 'reactstrap';

import {FaHome, FaSearch, FaPlusCircle, FaFire} from 'react-icons/fa';

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="Footer">
      <Navbar color="light" light>
            <NavLink href="#"><FaHome/></NavLink>
            <NavLink href="https://github.com/m-hakkestad/ReactAPITest"><FaFire/></NavLink>
            <NavLink href="#"><FaPlusCircle/></NavLink>
            <NavLink href="#"><FaSearch/></NavLink>
      </Navbar>
      </div>
    )
  }
}
export default Header;
