import React from "react";
//import QrReader from "react-qr-scanner";
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react'
import { publicRequest, userRequest } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter as  Router, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import axios from "axios";
//import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';

class QRScan extends React.Component {
  state = {
    delay: 100,
    result: "No result"
  };

  handleScan = (data) => {
    this.setState({
      result: data
    });
    alert("hi");
  };

    handleError = (err) => {
        console.error(err);
    };

    /*
            constraints={
                {
                    video: {
                          facingMode: { exact: selfie ? "user" : "environment"}
                    }
                }
            }

            exact: selfie ? "user" : 

    */

  render() {

    
    const StockInButton = styled.button`
        width: 40%;
        border: none;
        padding: 15px 20px;
        background-color: green;
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
    `
    const StockOutButton = styled.button`
        width: 40%;
        border: none;
        padding: 15px 20px;
        background-color: red;
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
    `

    const id = "";
    //const navigate  = useNavigate();
    /*const [product, setProduct] = useState({});
    const [new_sku, setSku] = useState(product.sku)
    const [new_title, setTitle] = useState(product.title)
    const [new_category, setCategory] = useState(product.category)
    const [new_quantity, setQuantity] = useState("")*/
    const handleStockIn = (e)=> {
        console.log("handleClick!!!!!!!")
        e.preventDefault()
        const StockIn = async ()=> {
            try{
                /*const newProduct = {
                    "title": new_title,
                    "sku": new_sku,
                    "desc": "good",
                    "img": "meble-200.jpg",
                    "category": new_category,
                    
                };
                
                
                
                console.log(newProduct)
                const res = await userRequest.put("/products/"+id)
                console.log(res.data);
                navigate("/Inventory"); 

                <div style={{color: "red", width: "100%", backgroundColor: "green"}}>
                <h1 >Hello Style!</h1>
            </div>
            */
            } catch(err) {
                alert("error: "+err);
            }
        };
        StockIn();/**/
    }

    const handleStockOut = (e)=> {
        e.preventDefault()
        const StockOut = async ()=> {
            try{
                var proceed = window.confirm("Are you sure you want to proceed?");
                if (proceed) {
                    const res = await userRequest.put("/products/"+id)
                    console.log(res.data);
                    //navigate("/Inventory");
                } else {
                  //don't proceed
                }
            } catch(err) {
                alert("error: "+err);
            }
        };
        StockOut();/**/
    }


    /*const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );*/
    return (
        <div style={{ width: "100%" }}>
            <Popup open={this.props.open} position="center">
                <div>Popup content here !!</div>
            </Popup>


            
            <QrReader style={{height: 500, width: 500, 
                borderRadius: 10}}
                delay={this.state.delay}
                //style={{width: '100%'}}
                /*onError={this.handleError}
                onScan={this.handleScan}*/
                constraints={{ facingMode: 'environment' }}
                onResult={(result, error) => {
                  if (!!result) {
                    //setData(result?.text);
                    this.setState({
                      result: result?.text
                    });

                    const getProducts = async ()=>{
                        try {
                            const res = await axios.get(
                                "https://inventory-qr-api.herokuapp.com/api/products/find/"+result.text
                                //"https://inventory-qr-api.herokuapp.com/api/products/find/623a2c1e6f9c8838e7b4189f"
                            );
                            //console.log(res.data);
                            alert(res.data.sku);
                            //this.props.setOpen(true)
                            //this.props.setOpen(false)
                            //createThreeButtonAlert();
                            //setProducts(res.data);
                        } catch (err) {
                            console.log(err);
                        }
                     }
                     getProducts();
                    //const res = await publicRequest.put("/products/"+id)
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }}
            />
            <p>{this.state.result}</p>
            <StockInButton onClick={handleStockIn}>
                Stock In
            </StockInButton>
            <StockOutButton onClick={handleStockOut}>
                Stock Out
            </StockOutButton>
            
        </div>
    );
  }
}

export default QRScan;
