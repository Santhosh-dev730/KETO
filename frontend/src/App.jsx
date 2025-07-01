import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'
import AdminHome from './Components/Admin/Home';
import UserHome from './Components/User/Home';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import ViewProducts from './Components/User/ViewProducts';
import Cart from './Components/User/Cart';
import Reset_Password from './Components/User/Reset_Password';
import Admin_Login from './Components/Admin/AdminLogin';
import Success from './Components/User/Success';
import AdminUser from './Components/Admin/AdminUser'
import AdminOrder from './Components/Admin/AdminOrder'

function App() {
  return (
    <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/AdminLogin" element={<Admin_Login/>}/>
        <Route path="/Admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Details/:id" element={<ViewProducts />} />
        <Route path="/cart/:customerId" element={<Cart />} />
        <Route path="/reset_password" element={<Reset_Password />}/>
        <Route path="/order-success" element={<Success />} />
        <Route path="/Adminuser" element={<AdminUser/>}/>
        <Route path="/Adminorder" element={<AdminOrder/>}/>
      </Routes>
  );
}

export default App;
