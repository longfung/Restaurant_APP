import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Input, Row, Col, Button, Label } from "reactstrap";
import { store } from "./Store";
import NavTab from "./NavTab";
import { useTranslation } from "react-i18next";
import access from "../util/access";


function User(props) {
  const [user, setUser] = useState({});
  const shareContext = useContext(store);
  const ownerId = shareContext.state.ownerId;
  const setMessage = props.setMessage;
  const { t } = useTranslation();

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
    }).catch((err) => {
      // let errorObject = JSON.parse(JSON.stringify(err));
      setMessage({ status: 404, msg: err.message });
    });
  }, []);

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
    }).catch((err) => {
      // let errorObject = JSON.parse(JSON.stringify(err));
      setMessage({ status: 404, msg: err.message });
    });
  };

  const updateUser = () => {
    const promise1 = access.updateUser(user);
    Promise.resolve(promise1).then(() => {
      let m = user.username + " is updated Successfully !!!";
      setMessage({ status: 200, msg: m });
    }).catch((err) => {
      // let errorObject = JSON.parse(JSON.stringify(err));
      setMessage({ status: 404, msg: err.message });
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
      <NavTab {...props} />
      <Form>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="username">{t("Username")}</Label>
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
              <Label for="password">{t("Password")}</Label>
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
              <Label for="email">{t("Email")}</Label>
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
              <Label for="phone">{t("Phone")}</Label>
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
            <Button onClick={submit}>{t("Save")}</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default User;
