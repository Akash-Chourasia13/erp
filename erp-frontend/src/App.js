import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import './styles/custom.scss';
import Navigation from './components/Navigation';
import Partner from './components/Partner';


function App() {
  return (
    <>
      {/* <Navigation /> */}
      {/* <Partner />
      <Login /> */}
      <AppRoutes />
    </>
  );
}

export default App;
