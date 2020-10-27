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
import { useTranslation } from "react-i18next";
import Language from './Language';

function Home(props) {
  const { t } = useTranslation();
  return (
    <div >

      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <Row>
          <Col sm={10} xs={10}>
            <h3>
              <CardTitle className=" font-weight-bold">{t("WelcomeToTakeOrder")}</CardTitle>
            </h3>
          </Col>

          <Col sm={2} xs={2} className="border-dark bg-dark font-weight-bold text-white text-nowrap">
            <Language />
          </Col>

        </Row>

        <Row>
          <Col sm="4">
            <CardBody>
              <CardText>{t("LoginToMaintainOwnShop")}</CardText>

              <NavLink
                className="border-info bg-light text-uppercase text-primary font-weight-bold active"
                href="/Login?userMode=1"
              >
                {t("Login")}
              </NavLink>

            </CardBody>
          </Col>
          <Col sm="4">
            <CardBody>
              <CardTitle>{t("CreateUserAccount")}</CardTitle>

              <NavLink
                className="border-info bg-light text-uppercase text-primary font-weight-bold"
                href="/User"
              >
                {t("CreateUser")}
              </NavLink>

            </CardBody>
          </Col>
          <Col sm="4">
            <CardBody>
              <CardTitle>{t("Demo")}</CardTitle>
              <NavLink
                className="border-info bg-light text-uppercase text-primary font-weight-bold"
                href="/login?userMode=2&userName=demo"
              >
                {t("RestaurantScenario")}
              </NavLink>
              <hr />
              <NavLink
                className="border-info bg-light text-uppercase text-primary font-weight-bold"
                href="/login?userMode=2&userName=demo2"
              >
                {t("CoffeeShopScenario")}
              </NavLink>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Home;
