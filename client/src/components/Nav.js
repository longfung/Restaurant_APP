import React from 'react'
import {Link} from 'react-router-dom';
import {
    Navbar,
    NavItem
  } from 'reactstrap';

function Nav() {
    return (
        <Navbar dark color="dark">
            <NavItem>
              <Link to='/Restaurant' >Restaurant</Link>
            </NavItem>
            <NavItem>
              <Link to='/Menu' >Menu</Link>
            </NavItem>
        </Navbar>      
    )
}

export default Nav

