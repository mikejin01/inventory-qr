import styled from "styled-components"
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined, LocalPrintshopOutlined, AddShoppingCartOutlined } from '@material-ui/icons'
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import { useState, useEffect } from 'react'
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive"
import { publicRequest, userRequest } from '../requestMethods';
import { useSelector } from "react-redux"
import axios from "axios";

const Info = styled.div`
	opacity: 100;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,0.2);
	z-index: 3;
	display: flex;
	/*flex-direction: column;*/
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`

const Container = styled.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	/*width: 25%;
	height: 350px;*/
	display: flex;
	align-items: center;
	justify-content: center;
	border: solid 1px blue;
	/*background-color: papayawhip;*/
	position: relative;
	&:hover ${Info}{
		opacity: 1;
	}
`

const pageBreakContainer = styled.div`
    display: block;
`

const pageBreak = styled.div`
	break-after: always !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
`


const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`

const Image = styled.img`
	height: 75%;
	z-index: 2;
`

const Title = styled.h1`
	flex: 1;
	color: blue;
	margin-bottom: 2px;
`
const Desc = styled.h1` //p
	flex: 2;
	color: black;
	margin-bottom: 2px;
`

const Icon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
	transition: all 0.5s ease;
	&:hover{
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`

const ButtonArea = styled.div`
	flex: 1;
`
const Button = styled.button`
	flex: 1;
	width: 100%;
	border: none;
	background-color: teal;
	color: white;
`

const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	flex: 1;
	/*display: flex;
	margin-left: 25px;
	*/
	align-items: center;
	padding: 5px;
`
const Input = styled.input`
	width: 100%;
	border: none;
	${mobile({ width: "50px" })};
`



/* <Info></Info>  */
const Product = ({item}) => {

	const [text, setText] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const generateQrCode = async () => {
	    try {
	 		const sku = item.sku;
	 		const _id = item._id;
	        const response = await QRCode.toDataURL(_id);
	      	//console.log(response);
	      	setImageUrl(response);
	      	handlePrint();
	    }catch (error) {
	      console.log(error);
	    }
	}

	class ComponentToPrint extends React.Component {
	  	render() {
		    return (
		      <div>
		      <style>
			    {`	@media print {
						.item {
					    	page-break-after: always;
					  	}

					  	.item-container {
					    	display: block;
					  	}
			    	}`
			    }
			  </style>
			      <div className="item-container">
			        <div style={{ fontSize: "40px", color: "green" }} className="item" >
			        	<br/>
			        	{item.sku}
			        	<br/>
			        	{item.title}
			        	<br/>
						Inventory QR
						<br/>
						BY A&M Discount Furniture
			        
			        <br/>
		            <br/>
		            <br/>
		            {imageUrl ? (
		              <a href={imageUrl} download>
		                  <img src={imageUrl} alt="img"/>
		              </a>) : null}
			      	</div>
			      </div>      
		      </div>
		    );
		  }
	}
	/*
    <Button onClick={generateQrCode}>
		<LocalPrintshopOutlined/>Print Code
	</Button>

	<ComponentToPrint ref={componentRef} />
	*/
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		//generateQrCode();
	    content: () => componentRef.current,
	});
	var CodeGenerated = "";


	//getElementsByClassName
		      	//console.log(response);
		      	//setImageUrl(qrCode);
		      	//console.log(item);
	var new_children = [];
	var new_numberOfBoxes = 1;
	const user = useSelector((state)=>state.user.currentUser);
	
	const addActivity = async ()=> {
		if (user != null) {
		    console.log("logged in as "+user.username);
		    console.log("accessToken = "+user.accessToken);
		    
		    
		    //console.log(useSelector((state)=>state);
		}
		try{	
			
			var currentTimeInSeconds=Math.floor(Date.now()/1000);
			var new_child = "";
			var new_parents = [];
			var username = user.username;
			if (item.type == "simple") {
				//alert(currentTimeInSeconds);
				const newActivity = {
					"productID": item._id,
					"title": "HI",
				    "QRID": item.sku+"-"+currentTimeInSeconds,
				    "desc": "good",
				    "status": "Code Generated",
				    "price": 0,
				    "cost": 0,
				    "quantity": 1
				};
				console.log(newActivity)
				const res = await userRequest.post("/activities", newActivity) 
				console.log(res.data);
				CodeGenerated = res.data._id;

				//alert("adding "+CodeGenerated);
		        const qrCode = await QRCode.toDataURL(CodeGenerated);
		        var purchaseOrder = document.getElementById(item.sku+"_PurchaseOrder").value;
		        
				dispatch(
					addProduct({...item, qrCode, quantity, purchaseOrder, username})
				);
			} else if (item.type == "complex"){
				for (var i = 0; i < item.children.length; i++) {
					//alert("Child #"+i+": "+item.children[i]);
					const newActivity = {
						"productID": item.children[i],
						"title": "HI",
					    "QRID": item.children[i]+"-"+currentTimeInSeconds,
					    "desc": "good",
					    "status": "Code Generated",
					    "price": 0,
					    "cost": 0,
					    "quantity": 1
					};
					console.log(newActivity)
					const res = await userRequest.post("/activities", newActivity) 
					console.log(res.data);
					CodeGenerated = res.data._id;

					//alert("adding "+CodeGenerated);
			        const qrCode = await QRCode.toDataURL(CodeGenerated);
			        var purchaseOrder = document.getElementById(item.sku+"_PurchaseOrder").value;

			        //getElementsByClassName
			      	//console.log(response);
			      	//setImageUrl(qrCode);
			      	//console.log(item);
			      	const products_res = await axios.get(
                        "https://inventory-qr-api.herokuapp.com/api/products/find/"+item.children[i]
                    );/**/;
					dispatch(
						addProduct({...products_res.data, qrCode, quantity, purchaseOrder, username})
					);

					//Things[i]
					/*const newPart = {
						"title": new_sku+"-Box "+i+" of "+new_numberOfBoxes,
						"sku": new_sku+"-Box "+i+" of "+new_numberOfBoxes,
					    "desc": "",
					    "img": "",
					    "category": ["Part"],
					    "size": [""],
						"color": [""],
					    "price": 0,
					    "cost": 0,
					    "stockQuantity": 0,
					    "type": "part", //simple, part
						"numberOfBoxes": 1,
						"children": [],
						"parents": [new_sku],
					};
					const res = await userRequest.post("/products", newPart) 
					new_children.push(res.data._id);  */ 
				}
			} else {
				//alert("item.type unkown!");
				const enterednNumberOfBoxes = prompt('Please enter Number of Boxes foe EACH SINGLE Product')
				new_numberOfBoxes = parseInt(enterednNumberOfBoxes);
				if (new_numberOfBoxes == 1) {
					const newProduct = {
					    "numberOfBoxes": new_numberOfBoxes,
					    "type": "simple", //simple, part
					};
					console.log(newProduct)
					const res = await userRequest.put("/products/"+item._id, newProduct)
					console.log(res.data);
				} else {
					//new_type = "complex"; //complex, part
					
					for (var i = 1; i <= new_numberOfBoxes; i++) {
						//Things[i]
						const newPart = {
							"title": item.sku+"-Box "+i+" of "+new_numberOfBoxes,
							"sku": item.sku+"-Box "+i+" of "+new_numberOfBoxes,
						    "desc": "",
						    "img": "",
						    "category": ["Part"],
						    "size": [""],
							"color": [""],
						    "price": 0,
						    "cost": 0,
						    "stockQuantity": 0,
						    "type": "part", //simple, part
							"numberOfBoxes": 1,
							"children": [],
							"parents": [item._id],
						};
						const res = await userRequest.post("/products", newPart)
						.then((res) =>{ 
							//alert("parent: "+res._id);
							alert(res.data._id);
							new_children.push(res.data._id); 
							console.log("CALLED!!!!!")
							console.log(new_children)
							//new_child = res.data._id;
							//console.log("!!!!!!!!!!!!!!RES")
							//console.log(res)
							//parent_id = parent_res._id;
					        updateParent();   
					    })
					    .catch((e) => alert(e));
					}

				}
				//alert(new_numberOfBoxes);
			    /* update state of this component with data provided by user. store data
			       in 'enteredName' state field. calling setState triggers a render of
			       this component meaning the enteredName value will be visible via the
			       updated render() function below */
			    //this.setState({ enteredName : enteredName })
			}
			
	        
			//alert(item.sku+" ADD TO Order Done");
			//navigate("/Inventory"); 
			//navigate("/Inventory"); 
			} catch(err) {
				alert("error: "+err);
			}
			

			
	};
	const updateParent = async ()=> {
		try{
			console.log("CALLED!!!!!")
			console.log(new_children)
			const updatedParent = {
				"type": "complex",
				"numberOfBoxes": new_numberOfBoxes,
				"children": new_children,
			};
			alert("new_numberOfBoxes: "+new_numberOfBoxes);
			/*const newProduct = {
					    "numberOfBoxes": new_numberOfBoxes,
					    "type": "simple", //simple, part
					};
					console.log(newProduct)
					const res = await userRequest.put("/products/"+item._id, newProduct)*/
			//console.log(newProduct)
			const updateParentRes = await userRequest.put("/products/"+item._id, updatedParent)
			console.log("updateParentRes!!!!!!!!!!!")
			console.log(updateParentRes)
			/**/
			} catch(err2) {
				alert("error2: "+err2);
			}
	};
	//addActivity();/**/
	//const addToOrder = async () => {
	const addToOrder = (e)=> {
		try {
	 		//const sku = item.sku;
	 		//const _id = item._id;
	        //const response = await QRCode.toDataURL(_id);
	        
	        //const qrCode = await QRCode.toDataURL(_id+"-"+currentTimeInSeconds);
	        addActivity();

	    }catch (error) {
	      console.log(error);
	    }
		//setProduct(item);
		//update cart
	};
	const handleSearch = (e)=> {
		//console.log("handleSearch!!!!!!!!!!"+e.target.value);
		//const value = e.target.value;
		console.log("!handleSearch: "+e.target.value); //.toLowerCase
		console.log("!!!!!!!!!"); //.toLowerCase
		/*setFilters({
			//...filters,
			["sku"]: e.target.value.toLowerCase(),//  e.target.value.toLowerCase() "meble-eva-kbl",//onChange=
		});*/
	}
	/*
	name

	Purchase Order
	*/
	return(
		<Container>
			<Title>
			<Link to ={`/product/${item._id}`}>
				{item.sku}
			</Link>
			</Title> 
			<Desc>
				{item.title}
				{item.type == "complex" ? (
		              <span> ({item.numberOfBoxes} Boxes)</span>
		        ) : null}
			</Desc>
			<Title>{item.stockQuantity}</Title>
			<ButtonArea>
				<SearchContainer> 
					<Input id={`${item.sku}_PurchaseOrder`} placeholder="Invoice #" onChange={handleSearch} />
				</SearchContainer>
				
				<Button onClick={addToOrder}>
					<AddShoppingCartOutlined/>ADD TO Order
				</Button>
			</ButtonArea>
			
			
		</Container>
	) 
}

export default  Product

