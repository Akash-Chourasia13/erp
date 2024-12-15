import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Partner from './components/Partner';
import SellerInventory from './components/SellerInventory';


export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/addPartner' element={<Partner />} />
                <Route path='/sellerInventory' element={<SellerInventory />} />
            </Routes>
        </Router>
    )
}