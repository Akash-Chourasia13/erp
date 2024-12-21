import React, { useState, useEffect } from 'react';
import { Container,Table } from 'react-bootstrap';

export default function SellerInventoryListing(){
    const [loading,setLoading] = useState(false)
    return(
        <>
        <Container className="mt-4">
        <h1 className="text-center mb-4">Data Table</h1>
        {loading? (<p>Loading...</p>):(
            <Table striped bordered hover responsive="md" className="custom-table">
                <thead className="table-dark">
                    <tr>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Hsn Code</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Gross Price</th>
                        <th>Discount %</th>
                        <th>Net Price</th>
                        <th>GST %</th>
                        <th>Final Amount</th>
                        <th>Created On</th>
                        <th>Updated On</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>
        )}
        </Container>

        </>
    )
}