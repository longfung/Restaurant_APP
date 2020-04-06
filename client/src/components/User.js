import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Input, Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import { store } from "./Store";
import access from "../util/access";

function User(props) {
  const [user, setUser] = useState({});
  const shareContext = useContext(store);
  const ownerId = shareContext.state.ownerId;
  const setMessage = props.setMessage;

  useEffect(() => {
    if (!ownerId) return;
    const promise1 = access.fetchUserById(ownerId);
    Promise.resolve(promise1).then(res => {
      const d = res.data;
      setUser({
        id: ownerId,
        username: d.username,
        password: "########",
        email: d.email,
        phone: d.phone
      });
    });
  }, []);

  const HandleCreateUser = () => {
    let data = JSON.stringify(user);

    // axios.post('/api/user', data, {
    //     headers: {'Content-Type': 'application/json'}
    axios
      .post("/api/user", data, {
        // headers: {'Content-Type': 'multipart/form-data' }
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        clearUserInput();
      });
  };

  const submit = () => {
    if (ownerId) updateUser();
    else createUser();
  };

  const createUser = () => {
    const promise1 = access.addUser(user);
    Promise.resolve(promise1).then(() => {
      let m = user.username + " is created Successfully !!!";
      setMessage({ status: 200, msg: m });
      clearUserInput();
    });
  };

  const updateUser = () => {
    const promise1 = access.updateUser(user);
    Promise.resolve(promise1).then(() => {
      let m = user.username + " is updated Successfully !!!";
      setMessage({ status: 200, msg: m });
    });
  };
  const clearUserInput = () => {
    setUser({
      id: ownerId,
      username: "",
      password: "",
      email: "",
      phone: ""
    });
  };

  return (
    <div>
      <Form>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={user.username}
                onChange={e => setUser({ ...user, username: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                id="password"
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                id="email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="phone">phone</Label>
              <Input
                type="text"
                id="phone"
                value={user.phone}
                onChange={e => setUser({ ...user, phone: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col cm="10"></Col>
          <Col sm="2">
            <Button onClick={submit}>Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default User;
