import React, { useState, useContext } from "react";
import { store } from "./Store";

import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { useTranslation } from "react-i18next";

const access = require("../util/access.js");

function Login(props) {
  debugger;
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const setMessage = props.setMessage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const urlParams = new URLSearchParams(props.location.search);
  const userMode = urlParams.get("userMode");

  if (userMode == 2) {
    const promise0 = access.performLogin("demo", "demo");
    Promise.resolve(promise0)
      .then((res0) => {
        const promise1 = access.fetchRestuarantByOwnerId(res0.data.id);
        Promise.resolve(promise1).then((res1) => {
          shareContext.dispatch({ type: "setRestaurant", value: res1.data });
          shareContext.dispatch({ type: "setUserMode", value: 1 });
          shareContext.dispatch({ type: 'setOwnerId', value: { id: res0.id, username: 'demo' } })
          return props.history.push("/order/id");
        });
      })
      .catch((err) => {
        setMessage({
          status: err.response.status,
          msg: err.response.data.error,
        });
      });
  }
  const submit = () => {
    const promise1 = access.performLogin(username, password);
    Promise.resolve(promise1)
      .then((res) => {
        // setOwnerId({ownerId: res.data.id});
        shareContext.dispatch({
          type: "setOwnerId",
          value: { id: res.data.id, username: res.data.username },
        });
        shareContext.dispatch({ type: "setUserMode", value: 2 });
        props.history.push("/restaurant");
      })
      .catch((err) => {
        console.error(err.response.data.error);
        setMessage({
          status: err.response.status,
          msg: err.response.data.error,
        });
      });
  };

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
