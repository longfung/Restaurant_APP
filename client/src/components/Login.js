import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import {Form, FormGroup, Input, Label, Row, Col, Button} from 'reactstrap';

function Login(props) {
    const setUserId = props.setUserId;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const submit = () => {
        debugger;
        // setUserId(100);
        let data = JSON.stringify({
            username: username,
            password: password
        });
        // axios.post('/api/user/login', data, {
        //     // headers: {'Content-Type': 'multipart/form-data' }
        //     headers: { 'Content-Type': 'application/json' }

 
        axios.post('/api/user/login', data, {
            headers: {"Content-Type": "application/json"}
        }).then ( res => {
            return(
                // <Redirect to="/Restaurant"/>
                props.history.push("/restaurant")
            )
        })
    }

    return (
    <Form inline>
        <Row>
            <Col sm='5'>
                <FormGroup>
                    <Label for="userName" hidden>Username</Label>
                    <Input type="Text" name="userName" id="userName" placeholder="UserName"
                     onChange={e => setUsername(e.target.value)}  />
                </FormGroup>
            </Col>
            <Col sm='5'>
                <FormGroup>
                    <Label for="password" hidden>Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}  />
                </FormGroup>
            </Col>
            <Col sm='2'>
     <          Button onClick={submit}>Login</Button>
            </Col>
        </Row>
     </Form>
  );
}

export default Login
