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
	//console.log(category, filters, sort);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(()=>{
		console.log("find category!!!!!!!");
		 const getProducts = async ()=>{
		 	try {
				const res = await axios.get(
					/*category 
					? `https://inventory-qr-api.herokuapp.com/api/products?category=${category}`
					: "https://inventory-qr-api.herokuapp.com/api/products"
					*/
					//?category=TV Stand
					"https://inventory-qr-api.herokuapp.com/api/products"
				);
				console.log("getProducts:");
				console.log(res.data);
				/*const sortDataByQuantity = (items) => {
				    return items.sort((first, second) => {
				      if (moment(first.items[0].date).isSame(second.items[0].date)) {
				        return -1;
				      } else if (moment(first.items[0].date).isBefore(second.items[0].date)) {
				        return -1;
				      } else {
				        return 1;
				      }
				    });
				}; */
				res.data.sort((a, b) => (a.stockQuantity > b.stockQuantity) ? 1 : -1)
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

