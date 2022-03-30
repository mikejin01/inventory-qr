import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { useState, useEffect } from 'react'
import axios from "axios";
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

const Container = styled.div`
	padding: 20px;
	/*display: flex;
	
	flex-wrap: wrap;
	justify-content: space-between;*/
`

const Products = ({category, filters, sort}) => {
	//console.log(category, filters, sort);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const location = useLocation();

	useEffect(()=>{
		console.log("find category!!!!!!!");
		console.log("category: "+category);
		const categoryNew = window.location.href.split("?")[1];// var  "" TV Stand sofa location.pathname.split("/")[2];
		console.log("categoryNew: "+categoryNew);
		 const getProducts = async ()=>{
		 	try {
				const res = await axios.get(
					//category
					categoryNew != null  
					? `https://inventory-qr-api.herokuapp.com/api/products?category=${categoryNew}`
					: "https://inventory-qr-api.herokuapp.com/api/products"
				);
				console.log("getProducts:");
				console.log(res.data);
				res.data.sort((a, b) => (a.stockQuantity < b.stockQuantity) ? 1 : -1)
				setProducts(res.data);
				/*products.sort((first, second) => {
			      if ( first.stockQuantity == second.stockQuantity ) {
			        return -1;
			      } else if ( first.stockQuantity < second.stockQuantity ) {//>
			        return -1;
			      } else {
			        return 1;
			      }
			    });*/
			    //list.sort((a, b) => (a.qty > b.qty) ? 1 : -1)
			} catch (err) {
				console.log(err);
			}
		 }
		 getProducts();
	}, [category]);
	/*useEffect(()=>{
	 	category && setFilteredProducts(
	 		products.filter(item => 
	 			Object.entries(filters).every(([key, value])=>
	 				item[key].includes(value) || item['title'].includes(value)
	 			)
	 		)
	 	);
	}, [products, category, filters]);*/
	useEffect(()=>{
		console.log("set Filtered Products!!!!!!!!");
	 	setFilteredProducts(
	 		products.filter(item => 
	 			Object.entries(filters).every(([key, value])=>
	 				/*if (key == "category") {
	 					
	 					//item["category"].includes(value)
	 				}
	 				else {*/
	 					item[key].toLowerCase().includes(value) || item['title'].toLowerCase().includes(value) || item["category"].indexOf(value[0]) > -1
	 				//}
	 				//item['title'].includes('YORK')
	 				
	 			)
	 		)
	 	);
	}, [products, filters]);

	return(
		<Container>
			{filteredProducts.map((item) =>
				<Product item={item} key={item.id} />)}


			
			{
			/*category 

				/*? filteredProducts.map((item) =>
				<Product item={item} key={item.id} />)
				: products.map((item) =>
				<Product item={item} key={item.id} />)
			*/}
		</Container>
	)
}

export default  Products

