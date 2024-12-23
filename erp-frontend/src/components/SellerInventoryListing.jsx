import React, { useState, useEffect } from 'react';
import { DataGrid, DEFAULT_GRID_AUTOSIZE_OPTIONS } from '@mui/x-data-grid';
import { Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { sellerInventoryInfo } from '../apiEndpoints/LocalApi';
import { GridCellParams } from '@mui/x-data-grid'

export default function SellerInventoryListing(props){
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const id = props.id
    // console.log("sbkdsv",id);

    const getVendorInventoryFunc = async(id) => {
        try{
            const response = await sellerInventoryInfo({'id':id});
            const data = response.data
            const formattedData = data.map((item)=>({
                'id':item.id,
                'hsnCode':item.hsncode,
                'quantity':item.quantity,
                'unitPrice':item.unit_price,
                'grossPrice':item.gross_price,
                'discPerc':item.discount_perc,
                'netPrice':item.net_price,
                'gstPerc':item.gst_perc,
                'finalAmount':item.final_amount,
                'createdAt':item.created_at,
                'updatedAt':item.updated_at,
                'product':{'productId':item.product_id.product_id,'productName':item.product_id.product_name},
                'brand':{'brandId':item.brand_id.brand_id,'brandName':item.brand_id.brand_name},
                'model':{'modelId':item.model_id.model_id,'modelName':item.model_id.model_name},
                'color':{'colorId':item.color_id.color_id,'colorName':item.color_id.color_name},

            }))
            setRows(formattedData)
        }catch(error){console.error(error)}
    }
// console.log("rows",rows);
    const columns = [
        {
            field: 'productName',
            headerName: 'Product',
            width: 100,
            valueGetter: (params) => {
                console.log("params:", params);
                return params?.row?.product?.productName || 'N/A'; // Safely accessing the nested property
            }
        },
        {
            field: 'brandName',
            headerName: 'Brand',
            width: 100,
            valueGetter: (params) => {
                return params?.row?.brand?.brandName || 'N/A';
            }
        },
        {
            field: 'modelName',
            headerName: 'Model',
            width: 100,
            valueGetter: (params) => {
                return params?.row?.model?.modelName || 'N/A';
            }
        },
        {
            field: 'colorName',
            headerName: 'Color',
            width: 100,
            valueGetter: (params) => {
                return params?.row?.color?.colorName || 'N/A';
            }
        },
        {field:'hsnCode',headerName:'Hsn Code',width:100},
        {field:'quantity',headerName:'Quantity',width:100},
        {field:'unitPrice',headerName:'Unit Price',width:100},
        {field:'grossPrice',headerName:'Gross Price',width:100},
        {field:'discPerc',headerName:'Discount %',width:100},
        {field:'netPrice',headerName:'Net Price',width:100},
        {field:'gstPerc',headerName:'GST %',width:100},
        {field:'finalAmount',headerName:'Final Amount',width:100},
        {field:'createdAt',headerName:'Created On',width:100},
        {field:'updatedAt',headerName:'updated On',width:100},
        {
            field:'actions',
            headerName:'Actions',
            width:150,
            renderCell:(params) => (
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={()=>handleEditClick(params.row)}
                >Edit</Button>
            ),
        },
    ];


     // Handle edit button click
  const handleEditClick = (row) => {
    console.log("row row",row);
    setCurrentRow(row); // Set the current row to edit
    setOpen(true); // Open the dialog
  };

    useEffect(()=>{
        if (id) {
            console.log("useEffect triggered with id:", id);
            getVendorInventoryFunc(id);
        } else {
            console.warn("ID is null or undefined in useEffect");
        }
    },[id])
    return (
        <>
            <Container style={{ height: 400, marginTop: 50 }}>
      <h1>Material-UI DataGrid with Edit Functionality</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // disableSelectionOnClick
      />

      {/* Edit Dialog */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            name="product_name"
            value={currentRow?.product_name || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Brand Name"
            name="brand_name"
            value={currentRow?.brand_name || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            value={currentRow?.quantity || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Final Amount"
            name="final_amount"
            value={currentRow?.final_amount || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>

        
        </>
    )
}