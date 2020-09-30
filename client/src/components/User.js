import React, { useState, useContext, useEffect } from "react";
// import { Form, FormGroup, Input, Row, Col, Button, Label } from "reactstrap";
import { store } from "./Store";
import NavTab from "./NavTab";
import { useTranslation } from "react-i18next";
import access from "../util/access";
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  Grid,
  Box,
} from '@material-ui/core';
import {
  TextField,
} from 'formik-material-ui';

function User(props) {
  debugger;
  const [user, setUser] = useState({});
  const shareContext = useContext(store);
  const ownerId = shareContext.state.ownerId;
  const setMessage = props.setMessage;
  const { t } = useTranslation();

  useEffect(() => {
    if (!ownerId) {
      clearUserInput();
      return;
    }
    const promise1 = access.fetchUserById(ownerId);
    Promise.resolve(promise1).then(res => {
      const d = res.data;
      setUser({
        id: ownerId,
        username: d.username,
        password: d.password,
        email: d.email,
        phone: d.phone
      });
    }).catch((err) => {
      // let errorObject = JSON.parse(JSON.stringify(err));
      setMessage({ status: 404, msg: err.message });
    });
  }, []);

  const onSubmit = (obj) => {
    if (ownerId) updateUser(obj);
    else createUser(obj);
  };

  const createUser = (obj) => {
    const promise1 = access.addUser(obj);
    Promise.resolve(promise1).then(() => {
      let m = obj.username + " is created Successfully !!!";
      setMessage({ status: 200, msg: m });
      clearUserInput();
    }).catch((err) => {
      // let errorObject = JSON.parse(JSON.stringify(err));
      setMessage({ status: 404, msg: err.message });
    });
  };

  const updateUser = (obj) => {
    const promise1 = access.updateUser(obj);
    Promise.resolve(promise1).then(() => {
      let m = obj.username + " is updated Successfully !!!";
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
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: user.id,
          username: user.username === null ||
            user.username === undefined
            ? ""
            : user.username,
          password: user.password === null ||
            user.password === undefined
            ? ""
            : user.password,
          email: user.email === null ||
            user.email === undefined
            ? ""
            : user.email,
          phone:
            user.phone === null ||
              user.phone === undefined
              ? ""
              : user.phone
          ,
        }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = t("E010");
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 4) {
            errors.password = t("E101");;
          }
          if (!values.email) {
            errors.email = t("E010");;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = t("E102");;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          debugger;
          setTimeout(() => {
            setSubmitting(false);
            onSubmit(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} >
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="username"
                    type="text"
                    label={t("Username")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label={t("Email")}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} >
                <Box margin={1}>
                  <Field
                    component={TextField}
                    type="password"
                    label={t("Password")}
                    name="password"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="phone"
                    type="text"
                    label={t("Phone")}
                  />
                </Box>
              </Grid>
              {isSubmitting && <LinearProgress />}
              <Grid item xs={12} sm={6} >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
            </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
  //   <div>
  //     <NavTab {...props} />
  //     <Form>
  //       <Row>
  //         <Col sm="6">
  //           <FormGroup>
  //             <Label for="username">{t("Username")}</Label>
  //             <Input
  //               type="text"
  //               id="username"
  //               value={user.username}
  //               onChange={e => setUser({ ...user, username: e.target.value })}
  //             />
  //           </FormGroup>
  //         </Col>
  //         <Col sm="6">
  //           <FormGroup>
  //             <Label for="password">{t("Password")}</Label>
  //             <Input
  //               type="text"
  //               id="password"
  //               value={user.password}
  //               onChange={e => setUser({ ...user, password: e.target.value })}
  //             />
  //           </FormGroup>
  //         </Col>
  //         <Col sm="6">
  //           <FormGroup>
  //             <Label for="email">{t("Email")}</Label>
  //             <Input
  //               type="text"
  //               id="email"
  //               value={user.email}
  //               onChange={e => setUser({ ...user, email: e.target.value })}
  //             />
  //           </FormGroup>
  //         </Col>
  //         <Col sm="6">
  //           <FormGroup>
  //             <Label for="phone">{t("Phone")}</Label>
  //             <Input
  //               type="text"
  //               id="phone"
  //               value={user.phone}
  //               onChange={e => setUser({ ...user, phone: e.target.value })}
  //             />
  //           </FormGroup>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col cm="10"></Col>
  //         <Col sm="2">
  //           <Button onClick={submit}>{t("Save")}</Button>
  //         </Col>
  //       </Row>
  //     </Form>
  //   </div>
  // );
}

export default User;
