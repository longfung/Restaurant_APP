import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  Navbar,
  NavLink,
  NavbarBrand,
  Button,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";
import { MdAccountCircle } from "react-icons/md";
import { store } from "./Store";
import i18next from "i18next";

function NavTab(props) {
  const shareContext = useContext(store);
  const username = shareContext.state.username;

  const goComponent = (target) => {
    props.history.push(target);
  };

  const setLanguage = (locale) => {
    shareContext.dispatch({ type: "setLocale", value: locale });
    // i18next.changeLanguage(locale);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Jumbotron fluid className="my-0 py-1 bg-info w-100">
          <Row>
            <Col sm="9">
              <Nav className="mr-auto px-1 bx-1 py-0 my-0" tabs pills>
                <NavItem className="mt-0 ">
                  <NavLink
                    className="border-info bg-light text-uppercase text-primary"
                    href="/"
                  >
                    Home
                  </NavLink>
                </NavItem>
                <NavItem className="mt-0">
                  <Button
                    className=" border-info bg-light text-dark text-uppercase"
                    onClick={() => goComponent("/Restaurant")}
                  >
                    Restaurant
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className=" border-info mb-0 bg-light text-dark text-uppercase"
                    onClick={() => goComponent("/Menu")}
                  >
                    Menu
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="border-info mb-0 bg-light text-dark text-uppercase"
                    onClick={() => goComponent("/Category")}
                  >
                    Category
                  </Button>
                </NavItem>

                <NavItem>
                  <Button
                    className="border-info mb-0 bg-light text-dark text-uppercase"
                    onClick={() => goComponent("/Order")}
                  >
                    Order
                  </Button>
                </NavItem>
                <NavItem className="mt-0 ">
                  <NavLink
                    className="border-info bg-light text-uppercase text-primary"
                    href="/Login"
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="border-info bg-light text-uppercase text-primary"
                    href="/User"
                  >
                    Create User
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col sm="1.5">
              <Link
                to="#!"
                onClick={() => setLanguage("en")}
                className="font-weight-bold text-white"
              >
                EN
              </Link>
              <Link
                to="#!"
                onClick={() => setLanguage("tw")}
                className="font-weight-bold text-white"
              >
                雜體
              </Link>
              <Link
                to="#!"
                onClick={() => setLanguage("zh")}
                className="font-weight-bold text-white"
              >
                简体
              </Link>
            </Col>
            <Col sm="1.5">
              <Link
                to="#!"
                onClick={() => props.history.push("/user")}
                className="font-weight-bold text-Dark"
              >
                <MdAccountCircle color="gold" size="2.2rem" /> {username}
              </Link>
            </Col>
          </Row>
        </Jumbotron>
      </Navbar>
    </div>
  );
}

export default NavTab;
