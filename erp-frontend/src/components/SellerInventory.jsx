import React, { useState, useEffect } from 'react';
import { getPartners, getProducts, createProduct, createBrand, getBrands, getModels, createModel, getColors, createColor, sellerInfo } from '../apiEndpoints/LocalApi';
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import SellerInventoryListing from './SellerInventoryListing'

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

    const [otherVendorDetails,setOtherVendorDetails] = useState({
        'hsnCode':"",
        'quantity':"",
        'unitPrice':"",
        'grossPrice':"",
        'discPerc':"",
        'netPrice':"",
        'gstPerc':"",
        'finalAmount':""
    })


    const fetchPartners = async() => {
        try{
            const response = await getPartners();
            const partners = response.data
            // Format the partners to match react-select structure (value and label)
            const formattedPartners = partners.map((partner) => ({
                value: partner.partner_id, // assuming gst_id is the unique identifier
                label: partner.partner_name, // assuming partner_name is what you want to display
                gst:partner.gst_id,
            }));
            
            setPartnerList(formattedPartners);
        }
        catch(error){console.error(error)}
    };
    const fetchItems = async(apiFunction,setList,keyMap) => {
        try{
            const response = await apiFunction();
            const getItems = response.data
            // console.log(getItems,keyMap.idKey,keyMap.nameKey)
            const formattedItems = getItems.map((item) => ({
                value:item[keyMap.idKey],
                label:item[keyMap.nameKey],
            }));
            // console.log(formattedItems)
            setList(formattedItems);
        }catch(error){console.error(error)}
    };

    const handleCreate = async (newValue,apiFunction,setList,keyMap,setSelected) => {
        try {
            // console.log("New Value to Create:", newValue);
    
            const response = await apiFunction({ [keyMap.nameKey]: newValue });
            // console.log("API Response:", response);
    
            const createdItem = response.data;
            // console.log("Created Product Data:", createdItem);
    
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
                // console.log("Updated Product List:", updatedList);
                return updatedList;
            });
            setSelected(newOption)
            
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleChange = async(e) => {
        const {name,value} = e.target

        // if (name==='quantity' || name==='unitPrice') && (!)

        setOtherVendorDetails((prev)=>{
            const updatedValue = {...prev,[name]:value}
            return updatedValue;
        })
        // console.log(otherVendorDetails)
    }

    const handleAdd = async(e) => {
        e.preventDefault();
        const completeDetail = {...otherVendorDetails,'partnerId':selectedOption.value,'productId':selectedProduct.value,'brandId':selectedBrand.value,'modelId':selectedModel.value,'colorId':selectedColor.value}
        try{
            const response = await sellerInfo(completeDetail)
            // console.log(response.data)
        }catch(error){console.log(error)}
    }
    
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
                <h1>Add to the Vendor Inventory</h1>
                    </Col>
                </Row>
                <Form className='d-flex'>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                            <Select 
                               options={partnerList}
                               placeholder="Select Vendor"
                               value={selectedOption}
                               onChange={(selected) => {setSelectedOption(selected);console.log(selected)}}
                               isClearable
                            />
                            <Form.Group>
                                <Form.Control disabled className="ms-2" value={selectedOption?.gst||""} />
                            </Form.Group>
                    </Col>
                </Row>
                </Form>
                <Form className='d-flex'>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                            <CreatableSelect 
                                options={productList}
                                placeholder="Select Product"
                                value={selectedProduct}
                                onChange={(selected) => {setSelectedProduct(selected);console.log(selectedProduct)}}
                                onCreateOption={(newValue) => {handleCreate(newValue,createProduct,setProductList,{idKey:'product_id',nameKey:'product_name'},setSelectedProduct)}}
                                isClearable
                            />
                    </Col>
                </Row>
                <Row>
                <Col md={12} className="d-flex justify-content">
                        <CreatableSelect 
                            options={brandList}
                            placeholder='Select Brand'
                            value={selectedBrand}
                            onChange={(selected)=>{setSelectedBrand(selected)}}
                            onCreateOption={(newValue) => {handleCreate(newValue,createBrand,setBrandList,{idKey:'brand_id',nameKey:'brand_name'},setSelectedBrand)}}
                            isClearable
                        />
                    </Col>
                </Row>
                <Row>
                    <Col  md={12} className="d-flex justify-content">
                        <CreatableSelect 
                            options={modelList}
                            placeholder='Select Model'
                            value={selectedModel}
                            onChange={(selected) => {setSelectedModel(selected)}}
                            onCreateOption={(newValue)=>{handleCreate(newValue,createModel,setModelList,{idKey:'model_id',nameKey:'model_name'},setSelectedModel)}}
                            isClearable
                        />

                    </Col>
                </Row>
                <Row>
                <Col md={12} className="d-flex justify-content">
                    <CreatableSelect 
                        options={colorList}
                        placeholder='Select Color'
                        value={selectedColor}
                        onChange={(selected) => {setSelectedColor(selected)}}
                        onCreateOption={(newValue) => {handleCreate(newValue,createColor,setColorList,{idKey:'color_id',nameKey:'color_name'},setSelectedColor)}}
                    />
                </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formHsnCode'>
                            <Form.Control type='text' placeholder='Enter Hsn Code' name='hsnCode' value={otherVendorDetails.hsnCode} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formQuantity'>
                            <Form.Control type='number' placeholder='Enter Quantity' name='quantity' value={otherVendorDetails.quantity} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formUnitPrice'>
                            <Form.Control type='number' placeholder='Enter Unit Price' name='unitPrice' value={otherVendorDetails.unitPrice} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formGrossPrice'>
                            <Form.Control type='number'  placeholder='Gross Price' name='grossPrice' value={otherVendorDetails.grossPrice} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formDiscPerc'>
                            <Form.Control type='number' placeholder='Enter Discount Perc' name='discPerc' value={otherVendorDetails.discPerc} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formNetPrice'>
                            <Form.Control type='number'  placeholder='Net Price' name='netPrice' value={otherVendorDetails.netPrice} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formGstPerc'>
                            <Form.Control type='number' placeholder='Enter GST Perc' name='gstPerc' value={otherVendorDetails.gstPerc} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content">
                        <Form.Group controlId='formFinalAmount'>
                            <Form.Control type='number'  placeholder='Final Amount' name='finalAmount' value={otherVendorDetails.finalAmount} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                    <Button variant='primary' className='mt-3' type='submit' onClick={handleAdd}>Add</Button>
                </Form>
            </Container>
            <SellerInventoryListing />
        </>
    )
}
