import React from 'react';
import Register from './components/Register';
import login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <>
      { <AppRoutes /> }
      {/* <Register /> */}
      {/* <Login /> */}
    </>
  );
}

export default App;
