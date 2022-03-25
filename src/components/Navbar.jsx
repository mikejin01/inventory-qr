import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
//import  from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from "@material-ui/core"
import { mobile } from "../responsive"
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
	/*height: 60px;
	background-color: black;
	*/
	${mobile({ display: "none", height: "50px" })};
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;
const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: "none" })};
`
const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`

const Input = styled.input`
	border: none;
	${mobile({ width: "50px" })};
`

const Logo = styled.h1`
	font-weight: bold;
	${mobile({ fontSize: "12px" })};
`
const Slogan = styled.p`
	font-weight: bold;
	${mobile({ fontSize: "8px" })};
`
const LogoImgContainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 50%;
    padding-right: 50%;
`
const LogoImgDesc = styled.p`
	flex: 9;
    text-align: right;
`
const LogoImg = styled.img`
	flex: 1;
    max-height: 40px;
`
const Center = styled.div`
	flex: 1;
	text-align: center;
	color: black;
    text-decoration: none;
	${mobile({ flex: 2, justifyContent: "center" })};
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "9px", marginLeft: "3px"  })};
`;

/*/*<LogoImgContainer>
					<LogoImgDesc>BY A&M Discount Furniture</LogoImgDesc> <LogoImg src="https://amdiscountfurniture.com/wp-content/uploads/2021/11/Logo-NO-Background-1-2-Recovered-3.png"/>
					</LogoImgContainer>*/

const Navbar = () => {
	const cart = useSelector(state => state.cart)
	const user = useSelector(state => state.user)
	console.log(cart);
	console.log(user);
	if (user != null) {
	    console.log("logged in as "+user.email);
	    console.log("accessToken = "+user.accessToken);
	    
	    //console.log(useSelector((state)=>state);
	}
	const dispatch = useDispatch();
	const logOutAction = async () => {

		//handlePrint();
		console.log("logOutAction");
		dispatch(logout());
	    /*try {
	 		const sku = item.sku;
	        const response = await QRCode.toDataURL(sku);
	      	//console.log(response);
	      	setImageUrl(response);
	      	handlePrint();
	    }catch (error) {
	      console.log(error);
	    }

		<SearchContainer>
					<Input placeholder="Search"/>
					<Search style={{color:"gray", fontSize:16}}/>
					</SearchContainer>

	    */
	}
	return(
		<Container>
			<Wrapper>	
				<Left>
					<Language>EN</Language>
					
					<Link to={`/Inventory`}><MenuItem>Inventory</MenuItem></Link>
					<Link to={`/PurchaseOrders`}><MenuItem>Purchase Orders</MenuItem></Link>
					<Link to={`/`}><MenuItem>Scan</MenuItem></Link>
				</Left>
				<Link to={`/`}>	
					<Center>
						<Logo>Inventory QR</Logo> 
						<Slogan>BY A&M Discount Furniture</Slogan> 	
					</Center>
				</Link> 
				<Right>
					<MenuItem>Register</MenuItem>
					{
						user.currentUser == null ? (
							<Link to={`/login`}><MenuItem>Sign In</MenuItem></Link>
			            ) : (
			            	<MenuItem onClick={logOutAction}>Log Out</MenuItem>
			            )
					}
				</Right>
			</Wrapper>	
		</Container>
		) 
}

export default Navbar

