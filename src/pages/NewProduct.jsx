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
import { useDispatch, useSelector } from 'react-redux'

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
const Form = styled.form`
	display: flex;
	flex-direction: column;
`

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0px;
	padding: 10px;
`
const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
`

const NewProduct = () => {
	//const location = useLocation();
	//const id = location.pathname.split("/")[2];
	/*const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(2);

	useEffect(()=>{
		const getProduct = async ()=> {
			try{
				const res = await publicRequest.get("/products/find/"+id)
				setProduct(res.data);
 			}catch{}
		};
		getProduct();
	},[id]);
	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity>1 && setQuantity(quantity-1)
		} else {
			setQuantity(quantity+1)
		}
	}
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")*/
	//const dispatch = useDispatch();
	//const {isFetching, error} = useSelector((state) => state.user);
	/*
	onChange={(e)=>setUsername(e.target.value)}
	onChange={(e)=>setPassword(e.target.value)}
	*/
	const handleClick = (e)=> {
		//e.preventDefault()
		//login(dispatch, {username, password});
	}
	return(
		<Container>	
			<Wrapper>

			<Title>New Product</Title>
			<Form>
				<Desc>SKU:</Desc>
				<Input 
					placeholder="SKU" 
					
				/> 
				<Desc>Title:</Desc>
				<Input 
					placeholder="Title" 
					type="password"
					
				/> 
				<ImgContainer>
					<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000304-H-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg" />
				</ImgContainer>
				<Button onClick={handleClick}>LOGIN</Button>
				<Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
				<Link>CREATE A NEW ACCOUNT</Link>
			</Form>

			</Wrapper>

		</Container>
		) 
}

export default  NewProduct

