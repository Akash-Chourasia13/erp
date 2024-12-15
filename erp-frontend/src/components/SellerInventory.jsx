import React, { useState, useEffect } from 'react';
import { getPartners } from '../apiEndpoints/LocalApi';
import { Container,Row,Col,Button,Form } from 'react-bootstrap';

export default function SellerInventory(){
    const [partnerList,setPartnerList] = useState([])
    useEffect(() => {
        const fetchPartners = async() => {
            try{
                const response = await getPartners();
                const partners = response.data
                setPartnerList(partners);
            }
            catch(error){console.error(error)}
    }
    fetchPartners();
},[]);
console.log(partnerList);

    return(
        <>
            {/* <Navigation /> */}
            <Container>
                <Row>
                <h1>Add to the Inventory</h1>
                    <Col md={3}>
                        <Form>
                            <Form.Group controlId='selectPartner'>
                                <Form.Select defaultValue=''>
                                    <option value='' disabled>Select Partner</option>
                                    {partnerList.map((partner) => ( <option key={partner.gst_id} value={partner.gst_id}>{partner.partner_name}</option> ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}