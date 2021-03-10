import React, { useState } from "react";
import { Button,Form, InputGroup,Col } from "react-bootstrap";
import { RiLockPasswordLine,RiUserSharedLine,RiKeyLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

import Axios from 'axios';

function Register() {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [client, setClient] = useState('');
    const [key, setKey] = useState('');
    const [email, setEmail] = useState('');
    
    
    const handleSubmit = (event) => {       
        event.preventDefault();
        setValidated(true);
        Axios.post("http://localhost:3000/set/register",{
            user:user,
            password:password,
            client:client,
            key:key,            
            email:email  
        })
        .then(response =>response) 
        .then(data =>{    
            console.log(data)                                                                                      
        })
        .catch(error => { 
            console.log(error)                                                                                 
        })   
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>    
                            <InputGroup.Text id="inputGroupPrepend"><RiUserSharedLine/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            value={user}
                            onChange={(e) => setUser(e.target.value)}                        
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group  as={Col} md="4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>    
                            <InputGroup.Text id="inputGroupPrepend"><RiLockPasswordLine/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-describedby="passwordHelpBlock"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <Form.Control.Feedback type="invalid">
                        Must be 8-20 characters long.
                        </Form.Control.Feedback>                       
                    </InputGroup>    
                </Form.Group>           
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Client</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>    
                            <InputGroup.Text id="inputGroupPrepend"><BiBuildingHouse/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            value={client}
                            onChange={(e) => setClient(e.target.value)}                        
                            type="text"
                            placeholder="Client"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a client.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Key</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>    
                            <InputGroup.Text id="inputGroupPrepend"><RiKeyLine/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            value={key}
                            onChange={(e) => setKey(e.target.value)}                        
                            type="text"
                            placeholder="Key"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a key.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Form.Row>                
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>E-mail</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>    
                            <InputGroup.Text id="inputGroupPrepend"><HiOutlineMail/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}                        
                            type="text"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>            
            <Button type="submit">Save register</Button>
        </Form>
    )
}

export default Register