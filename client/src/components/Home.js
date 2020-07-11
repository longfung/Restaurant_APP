import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  NavItem,
  Row,
  Col,
  NavLink
} from "reactstrap";

function Home(props) {
  return (
    <div >
      <Card>
        <CardImg
          top
          width="100%"
          src="/assets/318x180.svg"
          alt="Card image cap"
        />
        <Row>
          <Col sm="4">
            <CardBody>
              <CardTitle> Welcome to my restaurant</CardTitle>
              <CardText>Login to maintain owner restaurant</CardText>
              <NavItem className="mt-0">
                <NavLink
                  className="border-info bg-light text-uppercase text-primary"
                  href="/Login?userMode=1"
                >
                  Login
                </NavLink>
              </NavItem>
            </CardBody>
          </Col>
          <Col sm="4">
            <CardBody>
              <CardTitle> Create user account</CardTitle>
              <CardText>
                Create a user account and then to create restaurant
              </CardText>
              <NavItem className="mt-0">
                <NavLink
                  className="border-info bg-light text-uppercase text-primary"
                  href="/User"
                >
                  Create account
                </NavLink>
              </NavItem>
            </CardBody>
          </Col>
          <Col sm="4">
            <CardBody>
              <CardTitle> Demo</CardTitle>
              <CardText>
                run a demo1 to see how restaurant guest conduct ordering based on
                dish menu and demo2 for Coffee House
              </CardText>
              <NavItem className="mt-0">
                <NavLink
                  className="border-info bg-light text-uppercase text-primary"
                  href="/login?userMode=2&u=demo"
                >
                  Demo_restaurant
                </NavLink>
                <NavLink
                  className="border-info bg-light text-uppercase text-primary"
                  href="/login?userMode=2&u=demo2"
                >
                  Demo_Coffee
                </NavLink>
              </NavItem>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Home;
