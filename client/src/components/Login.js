import React, { useState, useContext, useEffect } from "react";
import { store } from "./Store";

import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { useTranslation } from "react-i18next";

const access = require("../util/access.js");

function Login(props) {
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const setMessage = props.setMessage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usermode, setUsermode] = useState(0);

  const urlParams = new URLSearchParams(props.location.search);
  const uMode = urlParams.get("userMode");
  // debugger;
  if (uMode == 2) {
    //   setUsermode(uMode);

    // useEffect(() => {
    //   debugger;
    if (uMode == 2) {
      const uName = urlParams.get("u");
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
        })
        .catch((err) => {
          setMessage({
            status: err.response.status,
            msg: err.response.data.error,
          });
        });
    }
  }
  // }, [usermode])

  const submit = () => {
    // debugger;
    const promise1 = access.performLogin(username, password);
    Promise.resolve(promise1)
      .then((res) => {
        // setOwnerId({ownerId: res.data.id});
        shareContext.dispatch({
          type: "setOwnerId",
          value: { id: res.data.id, username: res.data.username },
        });
        shareContext.dispatch({ type: "setUserMode", value: 1 });
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
