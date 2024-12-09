import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createPartner } from '../apiEndpoints/LocalApi'
import Navigation from './Navigation';

export default function Partner(){
    const [formPartner,setFormPartner] = useState({
        'partnerName':"",
        'officeNumber':"",
        'streetAddress':"",
        'area':"",
        'landmark':"",
        'pincode':"",
        'city':"",
        'state':"",
        'country':"",
        'number':"",
        'partnerType':"",
        'isRegistered':"",
        'gstId':""
    })
    const [errors,setErrors] = useState({
        'partnerName':"",
        'officeNumber':"",
        'streetAddress':"",
        'area':"",
        'landmark':"",
        'pincode':"",
        'city':"",
        'state':"",
        'country':"",
        'number':"",
        'partnerType':"",
        'isRegistered':"",
        'gstId':""
    })
    const [showGst,setShowGst] = useState('true');
    const handleChange = (e) => {
        const {name,value} = e.target
        setFormPartner(
            { ...formPartner,
                [name]:value
            }
        );
        setErrors({[name]:""});
        if(name==='isRegistered'){
            setShowGst(value==='0')
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        let newErrors = {};
        const formatErrorMessage = (key) => {
            return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        }
        let check =true;
        for (let key in formPartner){
            if(formPartner[key] === ""){
                newErrors[key] = `${formatErrorMessage(key)} cannot be empty.`
                check = false;
            }
        }
        if(formPartner.number.length!==10 || isNaN(formPartner.number)){
            newErrors['number']='Number is not valid.';
            check=false;
        };
        if(!check){
            setErrors(newErrors);
            return;
        }else{
            try {
            const response = await createPartner(formPartner);
            console.log(response.data)
            }
            catch(error){console.error(error)};
    }}
    
    
    return(
        <>
          <Navigation />
          <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <h1 className='text-center'>Add Partner</h1>
                    <Form>
                        <Form.Group controlId='formPartnerName'>
                            <Form.Label>Partner Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Partner Name' name='partnerName' value={formPartner.partnerName} onChange={handleChange} isInvalid={errors.partnerName} />
                            <Form.Control.Feedback type='invalid'>{errors.partnerName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formOfficeNumber'>
                            <Form.Label>Office Number</Form.Label>
                            <Form.Control type='text' name='officeNumber' placeholder='Enter Office Number' value={formPartner.officeNumber} onChange={handleChange} isInvalid={errors.officeNumber} />
                            <Form.Control.Feedback type='invalid'>{errors.officeNumber}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formStreetAddress'>
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control type='text' name='streetAddress' placeholder='Enter the street address' value={formPartner.streetAddress} onChange={handleChange} isInvalid={errors.streetAddress} />
                            <Form.Control.Feedback type='invalid'>{errors.streetAddress}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formArea'>
                            <Form.Label>Area</Form.Label>
                            <Form.Control type='text' placeholder='Enter the Area' name='area' value={formPartner.area} onChange={handleChange} isInvalid={errors.area} />
                            <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formLandmark'>
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control type='text' name='landmark' placeholder='Enter the Landmark' value={formPartner.landmark} onChange={handleChange} isInvalid={errors.landmark} />
                            <Form.Control.Feedback type='invalid'>{errors.landmark}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formPincode'>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type='text' name='pincode' placeholder='Enter pincode' value={formPartner.pincode} onChange={handleChange} isInvalid={errors.pincode} />
                            <Form.Control.Feedback type='invalid'>{errors.pincode}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formCity'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text' placeholder='Enter the City' name='city' value={formPartner.city} onChange={handleChange} isInvalid={errors.city} />
                            <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formState'>
                            <Form.Label>State</Form.Label>
                            <Form.Control type='text' placeholder='Enter the State' name='state' value={formPartner.state} onChange={handleChange} isInvalid={errors.state} />
                            <Form.Control.Feedback type='invalid'>{errors.state}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formCountry'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type='text' placeholder='Enter the Country' name='country' value={formPartner.country} onChange={handleChange} isInvalid={errors.country} />
                            <Form.Control.Feedback type='invalid'>{errors.country}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter your number" name='number' value={formPartner.number} onChange={handleChange} isInvalid={errors.number} />
                            <Form.Control.Feedback type='invalid'>{errors.number}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formPartnerType'>
                            <Form.Label>Partner Type</Form.Label>
                            <Form.Select name='partnerType' value={formPartner.partnerType} onChange={handleChange} isInvalid={errors.partnerType} >
                                <option value="" disabled>Select Partner Type</option>
                                <option value='0'>Seller</option>
                                <option value='1'>Buyer</option>
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>{errors.partnerType}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formIsRegistered'>
                            <Form.Label>Is Registered</Form.Label>
                            <Form.Select name='isRegistered' value={formPartner.isRegistered} onChange={handleChange} isInvalid={errors.isRegistered}>
                                <option value="" disabled>Select Registration Type</option>
                                <option value='0'>Registered</option>
                                <option value='1'>Not Registered</option>
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>{errors.isRegistered}</Form.Control.Feedback>
                        </Form.Group>
                        {showGst && <Form.Group controlId='formGstId'>
                            <Form.Label>GST</Form.Label>
                            <Form.Control type='text' placeholder='Enter the GST' name='gstId' value={formPartner.gst} onChange={handleChange} isInvalid={errors.gstId}/>
                            <Form.Control.Feedback type='invalid'>{errors.gstId}</Form.Control.Feedback>
                        </Form.Group>}
                    <Button variant='primary' className='mt-3' type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Col>
            </Row>
          </Container>
        </>
    )
}