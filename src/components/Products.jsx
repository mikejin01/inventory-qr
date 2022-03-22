import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { useState, useEffect } from 'react'
import axios from "axios";


const Container = styled.div`
	padding: 20px;
	/*display: flex;
	
	flex-wrap: wrap;
	justify-content: space-between;*/
`

const Products = ({category, filters, sort}) => {
	console.log(category, filters, sort);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(()=>{
		console.log("find category!!!!!!!");
		 const getProducts = async ()=>{
		 	try {
				const res = await axios.get(
					/**/category 
					? `https://inventory-qr-api.herokuapp.com/api/products?category=${category}`
					: "https://inventory-qr-api.herokuapp.com/api/products"
				);
				//console.log(res.data);
				setProducts(res.data);
			} catch (err) {
				console.log(err);
			}
		 }
		 getProducts();
	}, [category]);
	useEffect(()=>{
	 	category && setFilteredProducts(
	 		products.filter(item => 
	 			Object.entries(filters).every(([key, value])=>
	 				item[key].includes(value) || item['title'].includes(value)
	 			)
	 		)
	 	);
	}, [products, category, filters]);

	return(
		<Container>
			{category 
				? filteredProducts.map((item) =>
				<Product item={item} key={item.id} />)
				: products.map((item) =>
				<Product item={item} key={item.id} />)
			}
		</Container>
	)
}

export default  Products

