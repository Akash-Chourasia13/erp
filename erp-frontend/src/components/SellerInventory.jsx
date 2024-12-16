import React, { useState, useEffect } from 'react';
import { getPartners } from '../apiEndpoints/LocalApi';
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import Select from 'react-select';

export default function SellerInventory(){
    const [partnerList,setPartnerList] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const [selectedOption,setSelectedOption] = useState(null)

    const [productList,setProductList] = useState([])

    const fetchPartners = async() => {
        try{
            const response = await getPartners();
            const partners = response.data
            // Format the partners to match react-select structure (value and label)
            const formattedPartners = partners.map(partner => ({
                value: partner.gst_id, // assuming gst_id is the unique identifier
                label: partner.partner_name, // assuming partner_name is what you want to display
            }));
            
            setPartnerList(formattedPartners);
        }
        catch(error){console.error(error)}
    };
    const fetchProducts = async() => {
        try{
            const response = await getProducts();
            const products = response.data
            const formattedProducts = products.map((product) => ({
                value:product.product_id,
                label:product.product_name,
            }));
            
        }catch(error){console.error(erroe)}
    };
    useEffect(() => {
    fetchPartners();
    fetchProducts();
},[]);
console.log(partnerList);

    return(
        <>
            {/* <Navigation /> */}
            <Container>
                <Row>
                <Col md={8}>
                <h1>Add to the Inventory</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="d-flex justify-content">
                        <Form className="d-flex">
                            <Select 
                               options={partnerList}
                               placeholder="Select Partner"
                               value={selectedOption}
                               onChange={(selected) => {setSelectedOption(selected)}}
                               isClearable
                            />
                            <Form.Group>
                                <Form.Control disabled className="ms-2" value={selectedOption?.value||""} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="d-flex justify-content">
                        <Form className='d-flex'>
                            <Select 
                                options={products}
                                placeholder="Select Product"
                                value={selectedProduct}
                                onChange={(selected) => setSelectedProduct(selected)}

                                isClearable
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
