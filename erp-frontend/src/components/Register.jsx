import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { createUser } from '../apiEndpoints/LocalApi';
import { Link } from 'react-router-dom';

export default function Register(){
    const [ registerForm , setRegisterForm ] = useState({
        'firstName':"",
        'lastName':"",
        'number':"",
        'businessName':"",
        'email':"",
        'password':"",
    });
    const [errors,setErrors] = useState({
        'firstName':"",
        'lastName':"",
        'number':"",
        'businessName':"",
        'email':"",
        'password':"",
    });
    const handleChange = (e) => {
        const {name,value} = e.target
        setRegisterForm({
            ...registerForm,
            [name]:value
        });
        setErrors({[name]:""});
    }
    // console.log(registerForm)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(registerForm);
        let check = true;
        let updatedErrors = {};

        const formatErrorMessage = (key) => {
            // Capitalize the first letter and replace camelCase with spaces
            return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        };

        for (let key in registerForm){
            if(registerForm[key]===''){
                updatedErrors[key]=`${formatErrorMessage(key)} is empty.`;
                check=false;
            }
        };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(registerForm.email)){
            updatedErrors['email']='Email is not valid.';
            check=false
        };

        if(registerForm.number.length!==10 || isNaN(registerForm.number)){
            updatedErrors['number']='Number is not valid.';
            check=false
        };

        if(registerForm.password.length<=6){
            updatedErrors['password']='Password must be of more than 6 character long.';
            check=false;
        };

        if(registerForm.businessName.length<4){
            updatedErrors['businessName']='Business name should be more than 3 characters.';
            check=false;
        };

        if(!check){
            setErrors(updatedErrors);
            return;
        }else{
            try {
            const response = await createUser(registerForm);
            console.log(response.data)
            }
            catch(error){console.error(error)};
    }}
    return(
        <>
        <Container>
        <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center">Register</h1>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" name='firstName' value={registerForm.firstName} onChange={handleChange} isInvalid={errors.firstName}/>
                            <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" name='lastName' value={registerForm.lasttName} onChange={handleChange} isInvalid={errors.lastName}/>
                            <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter your number" name='number' value={registerForm.number} onChange={handleChange} isInvalid={errors.number} />
                            <Form.Control.Feedback type='invalid'>{errors.number}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBusinessName">
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Business Name" name='businessName' value={registerForm.businessName} onChange={handleChange} isInvalid={errors.businessName}/>
                            <Form.Control.Feedback type='invalid'>{errors.businessName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" name='email' value={registerForm.email} onChange={handleChange} isInvalid={errors.email}/>
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" name='password' value={registerForm.password} onChange={handleChange} isInvalid={errors.password}/>
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit}>
                            Register
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Already have an account? <Link to="/login">Login here</Link>.
                    </p>
                </Col>
            </Row>
        </Container>
        </>
    )
}