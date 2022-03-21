import styled from "styled-components"
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

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
/* <Info></Info>  */
const Product = ({item}) => {
	return(
		<Container>
			<Link to ={`/product/${item._id}`}>
				<SearchOutlined/> 
			</Link>
			<Title>{item.sku}</Title>
			<Desc>{item.title}</Desc>
			<Title>{item.stockQuantity}</Title>
		</Container>
	) 
}

export default  Product

