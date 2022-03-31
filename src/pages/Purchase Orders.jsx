import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { mobile } from "../responsive"
//import StripeCheckout from "react-stripe-checkout"
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import { useLocation } from 'react-router';
import styled from "styled-components"
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { addProduct, flushCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const KEY = "pk_test_51KWRnOAMTzXQCPFxmA8ofCeCnmwnJj70w5ZqEyD48BJxZ4EHwO4XgfLTacpf2HplVvgNaEgtPtnrAORfvqxLj1iz00wi772kKA"
//const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
`
const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })};
`
const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`
const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${props=>props.type === "filled" && "none"};
	background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
	color: ${props=>props.type === "filled" && "white"};
`

const TopTexts = styled.div`
	${mobile({ display: "none" })};
`

const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;

`

const Bottom = styled.div`
	display: flex;
	justify-content: center;
	${mobile({ flexDirection: "column" })};
`
const Info = styled.div`
	flex: 3;
`
const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })};
`
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`
const Image = styled.img`
	width: 200px;
`
const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const ProductName = styled.span`
	flex: 3;
`
const ProductSku = styled.span`
	flex: 3;
`
const ProductVariation = styled.span`
	flex: 3;
`
const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props => props.color}
`
const ProductSize = styled.span`
`
const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

`
const ProductQuantityContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`
const ProductQuantity = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })};
`
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })};
`
const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
	/*background-color: red;*/
`
const SummaryTitle = styled.h1`
	font-weight: 200;
`
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${props=>props.type === "total" && "500"};
	font-size: ${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`

/*	<Announcement />
	<Navbar />
	<Newsletter />
	<Footer /> */
const PurchaseOrders = () => {
	//const cart = useSelector((state) => state.cart);state
	const cart = useSelector((state)=>state.cart);
	const [stripeToken, setStripeToken] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [cartId, setcartId] = useState(1);
	const navigate  = useNavigate();
	
	const onToken = (token) => {
		//console.log(token);
		console.log("token on!!!!!!!!!!!!!");
		setStripeToken(token);
	}

	useEffect(() => { 
		const makeRequest = async () => {
 			try {

 				const res = await userRequest.post("/checkout/payment",{
 					tokenId: stripeToken.id,
					amount: cart.total * 100,
 				});
 				//history.push("/success", {data:res.data});
 				//console.log("res.data = "+res.data);
 				//navigate("/success", {data:res.data});

 				navigate("/success", { state: {data:res.data} });

				/*const res = await axios.post(
					"http://localhost:5000/api/checkout/payment",
					{ 
						tokenId: stripeToken.id,
						amount: 100,
					}
				);     
				console.log(res.data);
				navigate("/success"); //, {res.data}*/
			} catch (err) {
				console.log(err);
			}
		};
		if (stripeToken) {
			console.log("makeRequest()!!!!!!!!!!!!!");
			console.log("cart.total = "+cart.total);
			makeRequest();
		}
	}, [stripeToken, cart.total, navigate]);//navigate
	class ComponentToPrint extends React.Component {
	  	render() {
	  		/*
	      	*/
	      	const alternatingClass = ["begin", "end"];
	      	const current = new Date();
	      	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			//const d = new Date();
			let monthName = months[current.getMonth()];//current.getMonth()+1
	      	const date = `${monthName} ${current.getDate()}, ${current.getFullYear()}`;

		    return (
		      <div>
		      <style>
			    {`	
			    	.logo{
					  		display: none;
					  	}
			    	@media print {
			    		.begin {
			    			padding-top: 200px;
			    		}
						.end {
					    	page-break-after: always;
					  	}

					  	.item-container {
					    	display: block;
					  	}
					  	.logo{
					  		display: block;
					  		height: 30px;
					  		width: 90px;
					  	}
			    	}`
			    }
			  </style> 
			  
		      <div className="item-container">
		      	{cart.products.map((product, index)=>(
		      		<div 
		      			style={{ fontSize: "30px" }} 
		      			className={alternatingClass[index % 2]} 
		      			>
						<Product>
							<ProductDetail>
								{
									console.log("here again!")}
									{console.log(index)}
								<Details>
									<img 
									src="https://www.amdiscountfurniture.com/wp-content/uploads/2021/02/Logo-Black-Background.png" 
									alt="img"
									className="logo" 
									/>
									{
										product.type == "part" ? (
											<div>
												<ProductName><b>SKU: </b>{product.title} </ProductName>
												<ProductSku><b>Title: </b>{product.sku}</ProductSku>
											</div>
					
										) : (
											<div>
												<ProductSku><b>SKU: </b>{product.sku} </ProductSku>
												<ProductName><b>Title: </b>{product.title}</ProductName>
											</div>
					
										) 
									}
									{/*	<ProductSku><b>SKU: </b>{product.sku}</ProductSku>
										<ProductName><b>Title: </b>{product.title}</ProductName>*/}
									<ProductName><b>Invoice #: </b>{product.purchaseOrder} ordered by {product.username}</ProductName>
									<ProductSku><b>Date Printed: </b>{date}</ProductSku>
								</Details>
							</ProductDetail>
							<PriceDetail>
								{product.qrCode ? (
					              <a href={product.qrCode} download>
					                  <img src={product.qrCode} alt="img"/>
					              </a>) : null}
							</PriceDetail>
						</Product>
						<br/>
			            <br/>
			            <br/>
			            <br/>
					</div>
				))}

		      </div>
		      </div>
		    );
		  }
	}
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		//generateQrCode();
	    content: () => componentRef.current,
	});	
	const dispatch = useDispatch();
	const PrintCodes = async () => {

		handlePrint();
		dispatch(flushCart());
	    /*try {
	 		const sku = item.sku;
	        const response = await QRCode.toDataURL(sku);
	      	//console.log(response);
	      	setImageUrl(response);
	      	handlePrint();
	    }catch (error) {
	      console.log(error);
	    }*/
	}
	/*
	
	*/
	return(
		<Container>
			<Wrapper> 
				<Title>Purchase Order</Title>
				<Top>
				</Top>
				<Bottom>
					<Info>
						<ComponentToPrint ref={componentRef} />		
					</Info>
					<Summary>
					<SummaryTitle>ORDER SUMMARY</SummaryTitle>
					<SummaryItem>
						<SummaryItemText>Subtotal</SummaryItemText>
						<SummaryItemPrice>{cart.quantity}</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem type="total">
						<SummaryItemText >Total</SummaryItemText>
						<SummaryItemPrice>${cart.total}</SummaryItemPrice>
					</SummaryItem>
						<button
							style={{
								border: "none",
								width: 120,
								borderRadius: 5,
								padding: "20px",
								backgroundColor: "black",
								color: "white",
								fontWeight: "600",
								cursor: "pointer",
							}}
							onClick={PrintCodes} 
						>
							Print Codes
						</button>
					</Summary>>
				</Bottom>
			</Wrapper>
		</Container>
		) 
}

export default  PurchaseOrders

