import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { mobile } from "../responsive"
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { useState, useEffect } from 'react'

const Container = styled.div`
`
const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: "10px", flexDirection: "column" })};
`

const ImgContainer = styled.div`
	flex: 1;
`

const Image = styled.img`
	width: 100%;
	height: 90vh;
	object-fit: cover;
	${mobile({ height: "40vh" })};

`
const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: "10px" })};
`
const Title = styled.h1`
	font-weight: 200;
`

const Desc = styled.p`
	margin: 20px 0px;
`

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`

const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: "100%" })};
`

const Filter = styled.div`
	display: flex;
	align-items: center;
`

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`
const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props=>props.color};
	margin: 0px 5px;
	cursor: pointer;
`
const FilterMaterial = styled.select`
	margin-left: 10px;
	padding: 5px;
`

const FilterMaterialOption = styled.option`
`

const AddContainer = styled.div`
	width: 50%;
	display:flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })};
`
const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`
const Quantity = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`
const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	useEffect(()=>{
		const getProduct = async ()=> {
			try{
				const res = await publicRequest.get("/products/find/"+id)
				setProduct(res.data);
 			}catch{}
		};
		getProduct();
	},[id]);
	return(
		<Container>	
			<Wrapper>
				<ImgContainer>
					<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000304-H-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg" />
				</ImgContainer>
			<InfoContainer>
				<Title>{product.title}</Title>
				<Desc>{product.desc}</Desc>
				<Price>${product.price}</Price>
				<FilterContainer>
					<Filter>
						<FilterTitle>Color</FilterTitle>
						<FilterColor color="black"/>
						<FilterColor color="darakblue"/>
						<FilterColor color="gray"/>
					</Filter>
					<Filter>
						<FilterTitle>Material</FilterTitle>
						<FilterMaterial>
							<FilterMaterialOption>
								Metal
							</FilterMaterialOption>
							<FilterMaterialOption>
								Wood
							</FilterMaterialOption>
							<FilterMaterialOption>
								Marble
							</FilterMaterialOption>
						</FilterMaterial>
					</Filter>
				</FilterContainer>
				<AddContainer>
					<QuantityContainer>
						<Remove/>
						<Quantity>1</Quantity>
						<Add/>
					</QuantityContainer>
					<Button>ADD TO CART</Button>
				</AddContainer>
			</InfoContainer>
			</Wrapper>

		</Container>
		) 
}

export default  Product

