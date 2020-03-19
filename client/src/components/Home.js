import React from 'react'
import NavTab from './NavTab';
import {Card, CardImg, CardText, CardBody, CardTitle,  NavItem, Row, Col, NavLink} from 'reactstrap';

function Home() {
    return (
        <div>
        <Card>
          <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
          <Row>
              <Col sm='4'>
                <CardBody>
                    <CardTitle> Welcome to my restaurant</CardTitle>
                    <CardText>Login to maintain owner restaurant</CardText>
                    <NavItem className='mt-0'>
                            <NavLink className='border-info bg-light text-uppercase text-primary' href='/Login'>Login</NavLink>       
                    </NavItem> 
                </CardBody>
                 </Col>
                <Col sm='4'>
                    <CardBody>
                        <CardTitle> Create user account</CardTitle>
                        <CardText>Create a user account and then to create restaurant</CardText>
                        <NavItem className='mt-0'>
                                <NavLink className='border-info bg-light text-uppercase text-primary' href='/User'>Create account</NavLink>       
                        </NavItem> 
                    </CardBody>
                </Col>
                <Col sm='4'>
                    <CardBody>
                        <CardTitle> Demo</CardTitle>
                        <CardText>run a demo to see how restaurant guest conduct ordering based on dish menu</CardText>
                        <NavItem className='mt-0'>
                            <NavLink className='border-info bg-light text-uppercase text-primary' 
                                    href='/order/id?tableId=100?dumpId=200'>Demo</NavLink>       
                            </NavItem>     
                    </CardBody>
                </Col>
            </Row>
        </Card>
        </div>
    )
}

export default Home
