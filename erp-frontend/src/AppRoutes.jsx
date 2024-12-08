import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Partner from './components/Partner';


export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/addPartner' element={<Partner />} />
            </Routes>
        </Router>
    )
}