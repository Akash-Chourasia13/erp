import React, { useState, useEffect } from 'react';
import { getPartners, getProducts, createProduct, createBrand, getBrands, getModels, createModel, getColors, createColor } from '../apiEndpoints/LocalApi';
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function SellerInventory(){
    const [partnerList,setPartnerList] = useState([])
    const [selectedOption,setSelectedOption] = useState(null)

    const [productList,setProductList] = useState([])
    const [selectedProduct,setSelectedProduct] = useState(null)

    const [brandList,setBrandList] = useState([])
    const [selectedBrand,setSelectedBrand] = useState(null)

    const [modelList,setModelList] = useState([])
    const [selectedModel,setSelectedModel] = useState(null)

    const [colorList,setColorList] = useState([])
    const [selectedColor,setSelectedColor] = useState(null)


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
    const fetchItems = async(apiFunction,setList,keyMap) => {
        try{
            const response = await apiFunction();
            const getItems = response.data
            const formattedItems = getItems.map((item) => ({
                value:item[keyMap.id_key],
                label:item[keyMap.nameKey],
            }));
            setList(formattedItems);
        }catch(error){console.error(error)}
    };

    const handleCreate = async (newValue,apiFunction,setList,keyMap,setSelected) => {
        try {
            console.log("New Value to Create:", newValue);
    
            const response = await apiFunction({ [keyMap.nameKey]: newValue });
            console.log("API Response:", response);
    
            const createdItem = response.data;
            console.log("Created Product Data:", createdItem);
    
            // Validate the response
            if (!createdItem?.[keyMap.idKey] || !createdItem?.[keyMap.nameKey]) {
                console.error("Invalid API response structure:", createdItem);
                return;
            }
    
            // Format the new product for the dropdown
            const newOption = { 
                value: createdItem[keyMap.idKey], 
                label: createdItem[keyMap.nameKey] 
            };
    
            // Update product list
            setList((prev) => {
                const updatedList = [...prev, newOption];
                console.log("Updated Product List:", updatedList);
                return updatedList;
            });
            setSelected(newOption)
            
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    
    useEffect(() => {
    fetchPartners();
    fetchItems(getProducts,setProductList,{idKey:'product_id',nameKey:'product_name'});
    fetchItems(getBrands,setBrandList,{idKey:'brand_id',nameKey:'brand_name'});
    fetchItems(getModels,setModelList,{idKey:'model_id',nameKey:'model_name'});
    fetchItems(getColors,setColorList,{idKey:'color_id',nameKey:'color_name'});
    
},[]);
// console.log(partnerList);

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
                            <CreatableSelect 
                                options={productList}
                                placeholder="Select Product"
                                value={selectedProduct}
                                onChange={(selected) => {setSelectedProduct(selected)}}
                                onCreateOption={(newValue) => {handleCreate(newValue,createProduct,setProductList,{idKey:'product_id',nameKey:'product_name'},setSelectedProduct)}}
                                isClearable
                            />
                        </Form>
                    </Col>
                </Row>
                <Row>
                <Col md={6} className="d-flex justify-content">
                    <Form className='d-flex'>
                        <CreatableSelect 
                            options={brandList}
                            placeholder='Select Brand'
                            value={selectedBrand}
                            onChange={(selected)=>{setSelectedBrand(selected)}}
                            onCreateOption={(newValue) => {handleCreate(newValue,createBrand,setBrandList,{idKey:'brand_id',nameKey:'brand_name'},setSelectedBrand)}}
                            isClearable
                        />
                    </Form>
                    </Col>
                </Row>
                <Row>
                    <Col  md={6} className="d-flex justify-content">
                    <Form className='d-flex'>
                        <CreatableSelect 
                            options={modelList}
                            placeholder='Select Model'
                            value={selectedModel}
                            onChange={(selected) => {setSelectedModel(selected)}}
                            onCreateOption={(newValue)=>{handleCreate(newValue,createModel,setModelList,{idKey:'model_id',nameKey:'model_name'},setSelectedModel)}}
                            isClearable
                        />

                    </Form>
                    </Col>
                </Row>
                <Row>
                <Col  md={6} className="d-flex justify-content">
                <Form className='d-flex'>
                    <CreatableSelect 
                        options={colorList}
                        placeholder='Select Color'
                        value={selectedColor}
                        onChange={(selected) => {setSelectedColor(selected)}}
                        onCreateOption={(newValue) => {handleCreate(newValue,createColor,setColorList,{idKey:'color_id',nameKey:'color_name'},setSelectedColor)}}
                    />
                </Form>
                </Col>
                </Row>
            </Container>
        </>
    )
}
