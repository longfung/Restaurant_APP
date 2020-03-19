import React, {useState} from 'react'
import {Form, FormGroup, Input, Row, Col, Button, Label } from 'reactstrap';      
import axios from 'axios';

function User() { 
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    })

    const HandleCreateUser = () => {
        let data = JSON.stringify(user)

        // axios.post('/api/user', data, {
        //     headers: {'Content-Type': 'application/json'}
        axios.post('/api/user', data, {
            // headers: {'Content-Type': 'multipart/form-data' }
            headers: { 'Content-Type': 'application/json' }

        }) 
        .then(res => {
            clearUserInput()
        })
    }

    const clearUserInput = () => {
        setUser({
            username: '',
            password: '',
            email: '',
            phone: ''           
        })
    }

 
    return (
        <div>
            <Form>
                <Row>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input 
                                type="text" 
                                id="username"
                                value={user.username} 
                                onChange={e => setUser({...user, username: e.target.value})}/>                                  
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="text" 
                                id="password"
                                value={user.password} 
                                onChange={e => setUser({...user, password: e.target.value})}/>                                  
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="text" 
                                id="email"
                                value={user.email} 
                                onChange={e => setUser({...user, email: e.target.value})}/>                                  
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for="phone">phone</Label>
                            <Input 
                                type="text" 
                                id="phone"
                                value={user.phone} 
                                onChange={e => setUser({...user, phone: e.target.value})}/>                                  
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col cm='10'>

                    </Col>
                    <Col sm='2'>
                    <Button onClick={HandleCreateUser}>Save</Button>
                    </Col>
                    
                    

                </Row>
            </Form>
            
        </div>
    )
}

export default User
