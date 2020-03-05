import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {
    Nav,
    NavItem,
    Navbar
  } from 'reactstrap';


function NavTab() {  
    return (
        <Navbar color="light" light expand="md">
          <p color="red">Cheng Restaurant</p>
            <NavItem >
              <Link color="primary" to='/Restaurant' >Restaurant</Link>
            </NavItem>
            <NavItem>
              <Link to='/Menu' >Menu</Link>
            </NavItem>
            <NavItem>
              <Link to='/Category' >Category</Link>
            </NavItem>

        </Navbar>      

    )
}

export default NavTab

