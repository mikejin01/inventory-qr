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
const Button = styled.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
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
	const addToOrder = async () => {
		try {
	 		const sku = item.sku;
	        const qrCode = await QRCode.toDataURL(sku);
	      	//console.log(response);
	      	//setImageUrl(qrCode);
	      	//console.log(item);
			dispatch(addProduct({...item, qrCode, quantity})
			);
	    }catch (error) {
	      console.log(error);
	    }
		//setProduct(item);
		//update cart
		
	};
	return(
		<Container>
			<Title>
			<Link to ={`/product/${item._id}`}>
				{item.sku}
			</Link>
			</Title> 
			<Desc>{item.title}</Desc>
			<Title>{item.stockQuantity}</Title>
			<Button onClick={addToOrder}>
				<AddShoppingCartOutlined/>ADD TO Order
			</Button>
			
		</Container>
	) 
}

export default  Product

