import React, { useState } from 'react';
import { Container,Row,Col,Form,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginUser } from '../apiEndpoints/LocalApi';

export default function Login(){
    const [loginForm,setLoginForm] = useState({
        email:"",
        password:"",
    });
    const handleChange = (e) => {
        const {name,value} = e.target
        setLoginForm({
            ...loginForm,
            [name]:value
        })
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await loginUser(loginForm);
            // console.log(response)
        }catch(error){console.error(error)}
    }
    return(
        <>
        <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <h1 className='text-center'>Login</h1>
                    <Form>
                        <Form.Group controlId='formEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter your Email'
                                name='email'
                                value={loginForm.email}
                                onChange={handleChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type='password'
                            placeholder='Enter your Password'
                            name='password'
                            value={loginForm.password}
                            onChange={handleChange}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            className='mt-3'
                            onClick={handleSubmit}
                        >Login</Button>
                    </Form>
                    <p className='mt-3'>Don't have an account? <Link to="/register">Register Here</Link> </p>
                </Col>
            </Row>
        </Container>
        </>
    )
}