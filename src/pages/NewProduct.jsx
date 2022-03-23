import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { mobile } from "../responsive"
import { BrowserRouter as  Router, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestMethods';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	width: 50%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "85%" })};
	display: flex;
	flex-direction: column;
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
	*/
	//const dispatch = useDispatch();
	//const {isFetching, error} = useSelector((state) => state.user);
	/*
	
	*/
	const [new_sku, setSku] = useState("")
	const [new_title, setTitle] = useState("")
	const navigate  = useNavigate();
	const handleClick = (e)=> {
		console.log("handleClick!!!!!!!")
		e.preventDefault()
		//login(dispatch, {username, password});
		const addProduct = async ()=> {
			try{
				const newProduct = {
					"title": new_title,
					"sku": new_sku,
				    "desc": "good",
				    "img": "meble-200.jpg",
				    "category": ["sofa", "living room"],
				    "size": ["Q"],
					"color": ["RED"],
				    "price": 1999,
				    "cost": 402,
				    "stockQuantity": 0
				};
				console.log(newProduct)
				const res = await userRequest.post("/products", newProduct) 
				/*const res = await axios.post('https://inventory-qr-api.herokuapp.com/api/products', article, {
				  	headers: {
				  		token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzhhOTgyZTI4NjY4MTgxZmM5MDc0YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Nzg4MDY5NiwiZXhwIjoxNjQ4MTM5ODk2fQ.yBAYlkWiFqrGOXWrqd2trJI6sLsQg9Z7TvH4ZC5YhO4"
				  	}
				  })*/
				console.log(res.data);
				navigate("/Inventory"); 
 			}catch{}
		};
		addProduct();/**/
	}
	const formatInput = (event) => {
	  const attribute = event.target.getAttribute('name');
	  const removeExtraSpace = (s) => s.trim().split(/ +/).join('');
	  console.log("object = "+removeExtraSpace(event.target.value)); 
	  event.target.value = removeExtraSpace(event.target.value);
	}
	return(
		<Container>	
			<Wrapper>
			<Title>New Product</Title>
			<Form>
				<Desc>SKU:</Desc>
				<Input 
					placeholder="SKU" onBlur={formatInput}	onChange={(e)=>setSku(e.target.value)}
	
				/> 
				<Desc>Title:</Desc>
				<Input 
					placeholder="Title" onChange={(e)=>setTitle(e.target.value)}
				/> 
				<ImgContainer>
					<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000304-H-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg" />
				</ImgContainer>
				<Button onClick={handleClick}>ADD PRODUCT</Button>

			</Form>

			</Wrapper>

		</Container>
		) 
}

export default  NewProduct

