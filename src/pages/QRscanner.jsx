import React from "react";
//import QrReader from "react-qr-scanner";
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react'
import { publicRequest, userRequest } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter as  Router, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
//import Warper from './Warper';
  


 
const ControlledPopup = (e) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false); 
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Controlled Popup
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal" style={{backgroundColor: "black", color: "gold"}}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
          ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
          doloribus. Odit, aut.
        </div>
      </Popup>
    </div>
  );
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



const QRScan = () => {
    const state = {
        delay: 100,
        result: "No result"
    };

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
    const navigate  = useNavigate();
    const [product, setProduct] = useState({});
    const [activity, setActivity] = useState({});

    const [parent_product, setParent_product] = useState({});
    var parent_id = "";
    /*const [new_sku, setSku] = useState(product.sku)
    const [new_title, setTitle] = useState(product.title)
    const [new_category, setCategory] = useState(product.category)
    const [new_quantity, setQuantity] = useState("")*/
    const updateParent = async ()=> {
        try{
            alert("parent_id: "+parent_id);
            alert("called");
            
            } catch(err2) {
                alert("error2: "+err2);
            }
    };

    /*const parent_res = await axios.get(
                "https://inventory-qr-api.herokuapp.com/api/activities/find/"+parent_id
            ).then((parent_res) =>{
                for (var i = parent_res.data.children.length - 1; i >= 0; i--) {
                    alert("child: "+parent_res.data.children[i]);
                }
                //setParent_product(parent_res_2.data);
                //updateParent();   
            })
            .catch((e) => alert(e));*/


            /*console.log("CALLED!!!!!")
            console.log(new_children)
            const updatedParent = {
                "type": "complex",
                "numberOfBoxes": new_numberOfBoxes,
                "children": new_children,
            };
            alert("new_numberOfBoxes: "+new_numberOfBoxes);
            
            //console.log(newProduct)
            const updateParentRes = await userRequest.put("/products/"+item._id, updatedParent)
            console.log("updateParentRes!!!!!!!!!!!")
            console.log(updateParentRes)*/
            /**/
    const handleStockIn = (e)=> {
        console.log("handleClick!!!!!!!")
        e.preventDefault()
        const StockIn = async ()=> {
            try{
                const updatedProduct = {
                    "stockQuantity": product.stockQuantity+1,
                };
                const updatedActivity = {
                    "status": "Stocked In",
                };

                /*const arr = [14, 58, 20, 77, 66, 82, 42, 67, 42, 4]
                const min = Math.min(...arr)*/
                if (product.type == "part") {
                    alert("here");


                    console.log(updatedProduct)
                    const res = await userRequest.put("/products/"+product._id, updatedProduct)
                    .then((child_res) =>{  //parent_res_2
                        parent_id = child_res.data.parents[0];
                        alert("!!!!!parent_id: "+parent_id);
                        //setParent_product(child_res.data.parents[0]);
                        //updateParent();   
                    });
                    //const res2 = await userRequest.put("/activities/"+activity._id, updatedActivity)
                    console.log(res.data);
                    navigate("/"); 
                    alert(product.sku+" Stock In Done");

                    /*const parent_res = await axios.get(
                        "https://inventory-qr-api.herokuapp.com/api/activities/find/"+product.parents[0]
                    ).then((parent_res_2) =>{ 
                        setParent_product(parent_res_2.data);
                        updateParent();   
                    })
                    .catch((e) => alert(e));*/
                    //setParent_product(parent_res.data);
                    

                } else {

                    console.log(updatedProduct)
                    const res = await userRequest.put("/products/"+product._id, updatedProduct)
                    const res2 = await userRequest.put("/activities/"+activity._id, updatedActivity)
                    console.log(res.data);
                    navigate("/"); 
                    alert(product.sku+" Stock In Done");


                }



                /*
                "size": ["Q"],
                    "color": ["RED"],
                    "price": 1999,
                    "cost": 402,
                    "stockQuantity": 0
                */
                
                setOpen(false);
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
                //var proceed = window.confirm("Are you sure you want to proceed?");
                //if (proceed) {
                    const updatedProduct = {
                        "stockQuantity": product.stockQuantity-1,
                    };
                    const updatedActivity = {
                        "status": "Stocked Out",
                    };
                    /*
                    "size": ["Q"],
                        "color": ["RED"],
                        "price": 1999,
                        "cost": 402,
                        "stockQuantity": 0
                    */
                    console.log(updatedProduct)
                    const res = await userRequest.put("/products/"+product._id, updatedProduct)
                    const res2 = await userRequest.put("/activities/"+activity._id, updatedActivity)
                    console.log(res.data);
                    //navigate(); 
                    alert(product.sku+" Stock Out Done");
                    setOpen(false);
                    //const res = await userRequest.put("/products/"+product._id)
                    //console.log(res.data);
                    //navigate("/Inventory");
                //} else {
                  //don't proceed
                //}
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


      <div>
                <h4>Popup - GeeksforGeeks</h4>
                <Popup trigger={<button> Click to open popup </button>} 
                 position="right center">
                  <div>GeeksforGeeks</div>
                  <button>Click here</button>
                </Popup>
            </div>
    );


    <ControlledPopup/>

    */
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const ControlledPopupNew = (e) => {
      return (
        <div>
          
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal" style={{width: "300px", backgroundColor: "black", color: "gold"}}>
                <a className="close" onClick={closeModal}>
                &times;
                </a>
                {product.sku}
                <br/>
                {activity.status == "Code Generated" ? (
                    <StockInButton onClick={handleStockIn}>
                        Stock In
                    </StockInButton>
                ) : null}
                <br/>
                {activity.status == "Stocked In" ? (
                        <StockOutButton onClick={handleStockOut}>
                            Stock Out
                        </StockOutButton>
                ) : null}
                
            </div>
          </Popup>
        </div>
      );
    };
    /*
    <button type="button" className="button" onClick={() => setOpen(o => !o)}>
            Controlled Popup
          </button>
    <StockInButton onClick={handleStockIn}>
                Stock In
            </StockInButton>
            <StockOutButton onClick={handleStockOut}>
                Stock Out
            </StockOutButton>
            */
    return (
        <div style={{ width: "100%" }}>
            <ControlledPopupNew/>
            <QrReader style={{height: 500, width: 500, 
                borderRadius: 10}}
                delay={100}
                constraints={{ facingMode: 'environment' }}
                onResult={(result, error) => {
                  if (!!result) {
                    //setData(result?.text);
                    /*this.setState({
                      result: result?.text
                    });*/
                    state.result = result?.text;
                    var productID = "";
                    const getActivity = async ()=>{
                        try {
                            //var productID = result.text.split("-")[0];
                            //var QRID = result.text;
                            //alert("productID: "+productID);
                            const activities_res = await axios.get( 
                                "https://inventory-qr-api.herokuapp.com/api/activities/find/"+result.text//result.text
                                //"https://inventory-qr-api.herokuapp.com/api/products/find/"+productID//result.text

                            );
                            setActivity(activities_res.data);
                            productID = activities_res.data.productID;
                            alert("productID: "+ productID + " is now "+activities_res.data.status);
                            //setOpen(true);
                            getProducts();
                        } catch (err) {
                            alert(err);
                            console.log(err);
                        }
                     }
                    const getProducts = async ()=>{
                        try {
                            //var productID = result.text.split("-")[0];
                            //var QRID = result.text;
                            //alert("productID: "+productID);
                            /*const activities_res = await axios.get( 
                                "https://inventory-qr-api.herokuapp.com/api/activities/find/"+result.text//result.text
                                //"https://inventory-qr-api.herokuapp.com/api/products/find/"+productID//result.text

                            );*/
                            const products_res = await axios.get(
                                "https://inventory-qr-api.herokuapp.com/api/products/find/"+productID
                                //"https://inventory-qr-api.herokuapp.com/api/products/find/"+activities_res.data.productID//result.text
                                //"https://inventory-qr-api.herokuapp.com/api/products/find/623a2c1e6f9c8838e7b4189f"
                            );/**/
                            //console.log(res.data);
                            //alert(res.data.sku+" "+res.data.stockQuantity);
                            setProduct(products_res.data);
                            //setOpen(o => !o);
                            //alert(product.sku+" is now "+ activity.status);
                            setOpen(true);
                            //ControlledPopupNew("hi");
                            //this.props.setOpen(true)
                            //this.props.setOpen(false)
                            //createThreeButtonAlert();
                            //setProducts(res.data);
                        } catch (err) {
                            alert(err);
                            console.log(err);
                        }
                     }
                     getActivity();
                    //const res = await publicRequest.put("/products/"+id)
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }}
            />
            <p>{state.result}</p>
            
            
        </div>
    );
}
export default QRScan;
