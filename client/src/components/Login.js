import React, { useState, useContext, useEffect } from "react";
import { MdArrowBack } from 'react-icons/md';
import { store } from "./Store";
import { Link } from 'react-router-dom';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Form, FormGroup, Input, Label, Row, Col, Button
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Language from './Language';
const access = require("../util/access.js");

function Login(props) {
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const setMessage = props.setMessage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usermode, setUsermode] = useState(1);

  const urlParams = new URLSearchParams(props.location.search);
  const uMode = urlParams.get("userMode");
  // debugger;
  if (uMode == 2) {
    //   setUsermode(uMode);

    // useEffect(() => {
    //   debugger;
    if (uMode == 2) {
      const uName = urlParams.get("userName");
      const promise0 = access.performLogin(uName, "demo");
      Promise.resolve(promise0)
        .then((res0) => {
          const promise1 = access.fetchRestuarantByOwnerId(res0.data.id);
          Promise.resolve(promise1).then((rest) => {
            shareContext.dispatch({
              type: "setRestaurant",
              value: rest.data
            });
            shareContext.dispatch({ type: "setLocale", value: rest.data.locale });
            shareContext.dispatch({ type: "setUserMode", value: 2 });
            shareContext.dispatch({ type: 'setOwnerId', value: { id: res0.id, username: 'demo' } })
            return props.history.push("/order/id");
          });
        }).catch((err) => {
          // let errorObject = JSON.parse(JSON.stringify(err));
          setMessage({ status: 404, msg: err.message });
        });
    }

  }
  // }, [usermode])

  const submit = () => {
    debugger;
    const promise1 = access.performLogin(username, password);
    Promise.resolve(promise1)
      .then((res) => {
        // setOwnerId({ownerId: res.data.id});
        shareContext.dispatch({
          type: "setOwnerId",
          value: { id: res.data.id, username: res.data.username },
        });
        // if (uMode == 2)
        //   shareContext.dispatch({ type: "setUserMode", value: 2 });
        // else
        shareContext.dispatch({ type: "setUserMode", value: 1 });
        props.history.push("/restaurant");
      })
      .catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  return (
    <div >
      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <Row>

          <Col sm={10} xs={10}>
            <h3>
              <CardTitle className=" font-weight-bold">{t("WelcomeToTakeOrder")}</CardTitle>
            </h3>
          </Col>

          <Col sm={1} xs={1} className="border-dark bg-dark font-weight-bold text-white text-nowrap">
            <Language />
          </Col>
          <Col sm="1" xs="1" className="float-left">

            <Link to="#!"
              onClick={
                () => props.history.push("/")
              }
              className=" bg-dark font-weight-bold text-white">
              <MdArrowBack color="white" size="2rem" />
            </Link>

          </Col>

        </Row>

        <Row>
          <Form inline>
            <Row>
              <Col sm="5">
                <FormGroup>
                  <Label for="userName" hidden>
                    {t("Username")}
                  </Label>
                  <Input
                    type="Text"
                    name="userName"
                    id="userName"
                    placeholder={t("Username")}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col sm="5">
                <FormGroup>
                  <Label for="password" hidden>
                    Password
            </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t("Password")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col sm="2" >
                <Button className="font-weight-bold" onClick={submit} >{t("Login")}</Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    </div>
  );

  return (
    <Form inline>
      <Row>
        <Col sm="5">
          <FormGroup>
            <Label for="userName" hidden>
              {t("Username.1")}
            </Label>
            <Input
              type="Text"
              name="userName"
              id="userName"
              placeholder={t("Username.1")}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm="5">
          <FormGroup>
            <Label for="password" hidden>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm="2">
          <Button onClick={submit}>Login</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
