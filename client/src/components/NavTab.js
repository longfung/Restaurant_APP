import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {
    Nav,
    NavItem,
    Navbar,
    NavLink,
    NavbarBrand,
    Jumbotron
  } from 'reactstrap';


function NavTab() {  
    return (
      <div>

        <Navbar color="light" light expand="md">
          <Jumbotron fluid className='my-0 py-1 bg-info w-100'>
          <Nav className="mr-auto px-1 bx-1 py-0 my-0" tabs pills> 
           <NavItem className='mt-0 '>
            <NavLink className='border-info bg-light text-uppercase text-primary' href='/'>Home</NavLink>       
          </NavItem>    
           <NavItem className='mt-0'>
              <NavLink className=' border-info bg-light text-dark text-uppercase' href='/Restaurant'>Restaurant</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className = ' border-info mb-0 bg-light text-dark text-uppercase' href='/Menu' >Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='border-info mb-0 bg-light text-dark text-uppercase' href='/Category' >Category</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className='border-info mb-0 bg-light text-dark text-uppercase' href='/Order' >Order</NavLink>
            </NavItem>
            <NavItem className='mt-0 '>
              <NavLink className='border-info bg-light text-uppercase text-primary' href='/Login'>Login</NavLink>       
            </NavItem>     
            <NavItem>
              <NavLink className="border-info bg-light text-uppercase text-primary" href='/User'>Create User</NavLink>
            </NavItem>

            </Nav>
            </Jumbotron>

        </Navbar>     

      </div>
    )
}

export default NavTab

