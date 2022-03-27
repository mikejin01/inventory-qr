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
const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })};
`

const Option = styled.option`
`

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	useEffect(()=>{
		const getProduct = async ()=> {
			try{
				const res = await publicRequest.get("/products/find/"+id)
				setProduct(res.data);

				setSku(res.data.product.sku)
				setTitle(res.data.product.title)
				console.log("here!!!!!!!!!!!again");
 			}catch{}
		};
		getProduct();
	},[id]);
	/*
	const [quantity, setQuantity] = useState(2);
	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity>1 && setQuantity(quantity-1)
		} else {
			setQuantity(quantity+1)
		}
	}*/
	const [new_sku, setSku] = useState(product.sku)
	const [new_title, setTitle] = useState(product.title)
	const [new_category, setCategory] = useState(product.category)
	const [new_quantity, setQuantity] = useState("")
	const navigate  = useNavigate();
	const handleClick = (e)=> {
		console.log("handleClick!!!!!!!")
		e.preventDefault()
		const addProduct = async ()=> {
			try{
				const newProduct = {
					"title": new_title,
					"sku": new_sku,
				    "desc": "good",
				    "img": "meble-200.jpg",
				    "category": new_category,
				    
				};
				/*
				"size": ["Q"],
					"color": ["RED"],
				    "price": 1999,
				    "cost": 402,
				    "stockQuantity": 0
				*/
				console.log(newProduct)
				const res = await userRequest.put("/products/"+id, newProduct)
				console.log(res.data);
				navigate("/Inventory"); 
 			} catch(err) {
 				alert("error: "+err);
 			}
		};
		addProduct();/**/
	}

	const handleDelete = (e)=> {
		e.preventDefault()
		const deleteProduct = async ()=> {
			try{
				var proceed = window.confirm("Are you sure you want to proceed?");
				if (proceed) {
					const res = await userRequest.delete("/products/"+id)
					console.log(res.data);
					navigate("/Inventory");
				} else {
				  //don't proceed
				}
 			} catch(err) {
 				alert("error: "+err);
 			}
		};
		deleteProduct();/**/
	}

	const formatInput = (event) => {
	  const attribute = event.target.getAttribute('name');
	  const removeExtraSpace = (s) => s.trim().split(/ +/).join('');
	  console.log("object = "+removeExtraSpace(event.target.value)); 
	  event.target.value = removeExtraSpace(event.target.value);
	}
	/*
	defaultValue={product.title}

	<Input 
		defaultValue="hi" placeholder="" onChange={(e)=>setCategory([e.target.value])}
	/>
	*/
	return(
		<Container>	
			<Wrapper>
			<ImgContainer>
				<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000304-H-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg" />
			</ImgContainer>
			<InfoContainer>
				<Form>
					<Desc>SKU: {product.sku}</Desc>
					<Input 
						defaultValue={product.sku} onBlur={formatInput} onChange={(e)=>setSku(e.target.value)}
		
					/> 
					<Desc>Title: {product.title}</Desc>
					<Input 
						defaultValue={product.title} onChange={(e)=>setTitle(e.target.value)}
					/> 
					<Desc>Category: {product.category}</Desc>
					<Select name="color" onChange={(e)=>setCategory([e.target.value])}>
						<Option>
							{product.category}
						</Option>
						<Option>Barstool</Option>
						<Option>Bed</Option>
						<Option>Bookcase</Option>
						<Option>Box Spring</Option>
						<Option>Cabinet</Option>
						<Option>Chest</Option>
						<Option>Desk</Option>
						<Option>Dining Table</Option>
						<Option>Dining Chair</Option>
						<Option>Dresser</Option>
						<Option>Dresser Mirrors</Option>
						<Option>End Table</Option>
						<Option>Loveseat</Option>
						<Option>Lamp</Option>
						<Option>Mattress</Option>
						<Option>Nightstand</Option>
						<Option>Ottoman</Option>
						<Option>Pillow</Option>
						<Option>Rug</Option>
						<Option>Sofa</Option>
						<Option>Sectional</Option>
						<Option>Sofa Table</Option>
						<Option>Sleeper</Option>
						<Option>Server</Option>
						<Option>TV Stand</Option>
						<Option>Vanity</Option>
						<Option>Wall Decor</Option>
						<Option>Wall Art</Option>
						<Option>Other</Option>
					</Select>
					
					<Desc>Quantity:</Desc>
					<Input 
						value={product.quantity} onChange={(e)=>setQuantity(e.target.value)}
					/>
					<Button onClick={handleClick}>
						Update
					</Button>
					<Button onClick={handleDelete}>
						Delete
					</Button>
				</Form>
			</InfoContainer>
			</Wrapper>
		</Container>
		) 
}

export default  Product

