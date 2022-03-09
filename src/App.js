import logo from './logo.svg';
import './App.css';
import React from 'react'
import Navbar from './components/Navbar'
import Announcement from './components/Announcement'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Home from "./pages/Home";
/*import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import Success from "./pages/Success";*/
import { BrowserRouter as  Router, Routes, Route, Link, Navigate } from 'react-router-dom';

/*
<Router>
      <Navbar />
      <Announcement />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:sku" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
*/
function App() {
  const user = true;
  return (
    <Router>
      <Navbar />
      <Announcement />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
