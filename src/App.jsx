//import logo from './logo.svg';
import './App.css';
import React from 'react'
import Navbar from './components/Navbar'
import Announcement from './components/Announcement'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/Purchase Orders";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
/*import Pay from "./pages/Pay";
import Success from "./pages/Success";*/
import { BrowserRouter as  Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useSelector } from "react-redux"


//global.fetch = require('node-fetch')

/*console.log("here!!")
console.log("hi!");*/


function App() {
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <Router>
      <Navbar />
      <Announcement />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/NewProduct" element={<NewProduct />} />
        <Route path="/product/:sku" element={<Product />} />
        <Route path="/PurchaseOrders" element={<PurchaseOrders />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
