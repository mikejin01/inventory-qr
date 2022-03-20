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
//import Home from "./pages/Home";

/*import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import Success from "./pages/Success";*/
import { BrowserRouter as  Router, Routes, Route, Link, Navigate } from 'react-router-dom';



//global.fetch = require('node-fetch')


//const express = require("express");
//const app = express();
const mongoose = require("mongoose");
//const dotenv = require("dotenv");
//const userRoute = require("./routes/user");
//const productRoute = require("./routes/product");
/*const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const stripeRoute = require("./routes/stripe");*/
const cors = require("cors");

//dotenv.config();
console.log("here!!")
mongoose.connect(
  process.env.MONGO_URL
).then( ()=>
  console.log("db connected!!")
)
.catch( (err)=>{
  console.log(err);
});/**/
//shop

/*app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);*/

/*app.listen(process.env.PORT || 5000, () => {
  console.log("Background Server is running!");
});
console.log("hi!");*/


function App() {
  const user = true;
  return (
    <Router>
      <Navbar />
      <Announcement />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/PurchaseOrders" element={<PurchaseOrders />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
