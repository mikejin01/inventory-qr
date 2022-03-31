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

const Select = styled.select`
	padding: 10px;
	${mobile({ margin: "10px 0px" })};
	margin: 20px 0px;
`

const Option = styled.option`
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
	const [numberOfBoxes, setNumberOfBoxes] = useState(0)
	const navigate  = useNavigate();
	const handleClick = (e)=> {
		console.log("handleClick!!!!!!!")
		e.preventDefault()
		//login(dispatch, {username, password});
		var parent_id = "";
		var new_type = "simple"; //complex, part
		var new_children = [];
		var new_parents = [];
		var new_numberOfBoxes = 1;
		const addProduct = async ()=> {
			try{
				if (numberOfBoxes == "I Don't Know" || numberOfBoxes == 0) {
					//alert("no!!!!!");
					const newProduct = {
						"title": new_title,
						"sku": new_sku,
					    "desc": "good",
					    "img": "meble-200.jpg",
					    "category": ["Other"],
					    "size": [""],
						"color": [""],
					    "price": 0,
					    "cost": 0,
					    "stockQuantity": 0,
					    "type": "", //new_type simple, part
						"numberOfBoxes": new_numberOfBoxes,
						"children": new_children,
						//"parents": new_parents,
					};
					console.log(newProduct)
					const parent_res = await userRequest.post("/products", newProduct) 

				} else if (numberOfBoxes == 1 ) {
					//alert("no!!!!!");
					const newProduct = {
						"title": new_title,
						"sku": new_sku,
					    "desc": "good",
					    "img": "meble-200.jpg",
					    "category": ["Other"],
					    "size": [""],
						"color": [""],
					    "price": 0,
					    "cost": 0,
					    "stockQuantity": 0,
					    "type": "simple", //simple, part
						"numberOfBoxes": new_numberOfBoxes,
						"children": new_children,
						//"parents": new_parents,
					};
					console.log(newProduct)
					const parent_res = await userRequest.post("/products", newProduct) 

				}else {
					new_numberOfBoxes = numberOfBoxes;
					new_type = "complex"; //complex, part
					for (var i = 1; i <= numberOfBoxes; i++) {
						//Things[i]
						const newPart = {
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
						new_children.push(res.data._id);   
					}
					const newProduct = {
						"title": new_title,
						"sku": new_sku,
					    "desc": "good",
					    "img": "meble-200.jpg",
					    "category": ["Other"],
					    "size": [""],
						"color": [""],
					    "price": 0,
					    "cost": 0,
					    "stockQuantity": 0,
					    "type": new_type, //simple, part
						"numberOfBoxes": new_numberOfBoxes,
						"children": new_children,
						//"parents": new_parents,
					};
					console.log(newProduct)
					const parent_res = await userRequest.post("/products", newProduct)
					.then((res) =>{ 
						//alert("parent: "+res._id);
						parent_id = res.data._id;
						console.log("!!!!!!!!!!!!!!RES")
						console.log(res)
						//parent_id = parent_res._id;
				        updateChildren();   
				        /*for (var i = 0; i < new_children.length; i++) {
							alert("parent: "+res.data._id);
							alert("add to: "+new_children[i]);
							const updatedChild = {
								"parents": [res.data._id],
							};
							//console.log(newProduct)
							const updatedChildRes = await userRequest.put("/products/"+new_children[i], updatedChild)
							//console.log(res.data);
							//alert("Child #"+i+": "+new_children[i]);
						}/**/ /**/
				    })
				    .catch((e) => alert(e));

					//parent_id = parent_res._id;


					/*const uploadData = axios
				    .post("http://localhost:80/newItem", {
				        photos: photo,
				        title: title,
				    })
				    .then((res) =>{ 
				            alert(JSON.stringify(res))
				            setPhotoUrl('');
				            setTitle('');
				    })
				    .catch((e) => alert(e));
					//console.log(res.data);
				    updateChildren();*/	
					

					
				}
				
				navigate("/Inventory"); 
 			} catch(err) {
 				alert("error: "+err);
 			}
		};
		const updateChildren = async ()=> {
			try{
				for (var i = 0; i < new_children.length; i++) {
					//alert("parent: "+parent_id);
					//alert("add to: "+new_children[i]);
					const updatedChild = {
						"parents": [parent_id],
					};
					//console.log(newProduct)
					const res = await userRequest.put("/products/"+new_children[i], updatedChild)
					//console.log(res.data);
					//alert("Child #"+i+": "+new_children[i]);
				}
				navigate("/Inventory"); 
 			} catch(err) {
 				alert("error: "+err);
 			}
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
				<Desc># of Boxes:</Desc>
				<Select name="numberOfBoxes" onChange={(e)=>setNumberOfBoxes(e.target.value)}>
						<Option>I Don't Know</Option>
						<Option>1</Option>
						<Option>2</Option>
						<Option>3</Option>
						<Option>4</Option>
						<Option>5</Option>	
				</Select>
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

