import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { store } from "./Store";

import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { useTranslation } from "react-i18next";

const access = require("../util/access.js");

function Login(props) {
  debugger;
  const { t } = useTranslation();
  const shareContext = useContext(store);
  // const restId = shareContext.state.restaurant.Id;
  // const setOwnerId = props.setOwnerId;
  // const setRestaurant = props.setRestaurant;
  const setMessage = props.setMessage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const urlParams = new URLSearchParams(props.location.search);
  const userMode = urlParams.get("userMode");

  // async function fetchRestuarantByOwnerId (id) {
  //     try {
  //     let data = {ownerId: id};
  //     const rest = await axios.get('/api/restaurant/:ownerId', {params:data})
  //     return rest
  //     } catch (err) {

  //         alert('error');
  //     }

  //  }

  debugger;
  if (userMode == 2) {
    // fetchRestuarantByOwnerId(105)
    // .then ( function (res) {
    //     if (res.data[0]) {
    //         let rest = res.data[0];
    //         setRestaurant(rest);
    //         return (
    //             props.history.push("/order/id", {ownerId: res.data[0].owner_id}))
    //     }})

    // const promise1 = fetchRestuarantByOwnerId(105);
    // Promise.all([promise1]).then( res  => {
    //     if (res[0].data[0]) {
    //         let rest = res[0].data[0];
    //         setRestaurant(rest);
    //         return (
    //             props.history.push("/order/id", {ownerId: rest.owner_id}))
    //     }})

    // Promise.all([
    //     p1.catch(error => { return error; }),
    //     p2.catch(error => { return error; }),
    //     p3.catch(error => { return error; }),
    // ]).then(values => {
    //     console.log(values[0]);
    //     console.log(values[1]);
    //     console.log(values[2]);
    // });

    // const foo = [
    //     new Promise((resolve, reject) => setTimeout(resolve, 222, '🥝')),
    //     new Promise((resolve, reject) => setTimeout(resolve, 333, '🍏')),
    //     new Promise((resolve, reject) => setTimeout(reject, 111, '🍍')),
    //     new Promise((resolve, reject) => setTimeout(resolve, 444, '🍇'))
    //   ];

    //   Promise.race(foo)
    //     .then(console.log)
    //     .catch(console.log);
    const promise0 = access.performLogin("demo", "demo");
    Promise.resolve(promise0)
      .then((res0) => {
        const promise1 = access.fetchRestuarantByOwnerId(res0.data.id);
        Promise.resolve(promise1).then((res1) => {
          // setRestaurant(res1.data);
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

    // let data = {ownerId: 105};
    // axios.get('/api/restaurant/:ownerId', {params:data})
    // .then (res => {
    //     if (res.data[0]) {
    //         let rest = res.data[0];
    //         setRestaurant(rest);
    //         return (
    //             props.history.push("/order/id", {ownerId: res.data[0].owner_id})
    //         )
    //     }
    //     console.log(res.data.owner_id);
    // })
  }
  const submit = () => {
    debugger;
    // setUserId(100);
    const promise1 = access.performLogin(username, password);
    // Promise.all([promise1]).then (res => {
    //     setOwnerId({ownerId: res[0].data.id});
    //     props.history.push("/restaurant", {ownerId: res[0].data.id})
    // }).catch(err => {
    //     console.error(err.response.data.error);
    //     setMessage({status: err.response.status,
    //         msg: err.response.data.error
    //     })
    // })
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

  // let data = JSON.stringify({
  //     username: username,
  //     password: password
  // });

  // axios.post('/api/user/login', data, {
  //     headers: {"Content-Type": "application/json"}
  // }).then ( res => {
  //     setOwnerId({ownerId: res.data.id});
  //     return(
  //         // <Redirect to="/Restaurant"/>
  //         props.history.push("/restaurant", {ownerId: res.data.id})
  //     )
  // })

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
