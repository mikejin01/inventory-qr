import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { useState, useEffect } from 'react'
import axios from "axios";
import { publicRequest, userRequest } from '../requestMethods';
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

const Container = styled.div`
	padding: 20px;
	/*display: flex;
	
	flex-wrap: wrap;
	justify-content: space-between;*/
`

const Products = ({category, filters, sort, resetAll}) => {
	//console.log(category, filters, sort);
	const [products, setProducts] = useState([]);
	const [activities, setActivities] = useState([]);
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
		 const getActivities = async ()=>{
		 	try {
				const activitiesRes = await axios.get(
					//`https://inventory-qr-api.herokuapp.com/api/activities?category=${categoryNew}`
					"https://inventory-qr-api.herokuapp.com/api/activities"
				);
				setActivities(activitiesRes.data);
				//alert("# of activities retrieved: "+activities.length);
			} catch (err) {
				console.log(err);
			}
		 }
		 getProducts();
		 getActivities();
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
		//alert("# of activities retrieved: "+activities.length);
		console.log("set Filtered Products!!!!!!!!");
	 	setFilteredProducts(
	 		products.filter(item => 
	 			Object.entries(filters).every(([key, value])=>
	 				/*if (key == "category") {
	 					
	 					item["category"].includes(value)
	 				}
	 				else {/**/
	 					//item[key].toLowerCase().includes(value.toLowerCase())
	 					item['sku'].toLowerCase().includes(value.toLowerCase()) || item['title'].toLowerCase().includes(value.toLowerCase()) || item["category"].indexOf(value) > -1
	 				//}value[0]
	 				//item['title'].includes('YORK')
	 				
	 			)
	 		)
	 	);
	}, [products, filters]);
	useEffect(()=>{
		//alert("resetAll is now "+resetAll);

		if (resetAll == true) {
			alert("!!!!!!resetAll is now "+resetAll);
			alert("# of activities retrieved: "+activities.length);

			for (var i = activities.length - 1; i >= 0; i--) {
				//console.log("checking "+ products[i].sku);
				if (activities[i].status == "Code Generated") {
					console.log("deleting "+ activities[i]._id);

                    const deleteActivity = async ()=>{
					 	try {
							const res = await userRequest.delete("/activities/"+activities[i]._id)
						} catch (err) {
							console.log(err);
						}
					}
					deleteActivity();
				} else if (activities[i].status == "Stocked In"){
					console.log("checking "+ activities[i].sku + " is Stocked In");
					const updatedActivity = {
                        "status": "Code Generated",
                    };
                    const resetActivity = async ()=>{
					 	try {
							const res = await userRequest.put("/activities/"+activities[i]._id, updatedActivity)
						} catch (err) {
							console.log(err);
						}
					}
					resetActivity();

				}
				
			}

			for (var i = products.length - 1; i >= 0; i--) {
				//console.log("checking "+ products[i].sku);
				if (products[i].stockQuantity > 0) {

					console.log("checking "+ products[i].sku + " > 0");
					const updatedProduct = {
                        "stockQuantity": 0,
                    };
                    const resetProduct = async ()=>{
					 	try {
							const res = await userRequest.put("/products/"+products[i]._id, updatedProduct)
						} catch (err) {
							console.log(err);
						}
					}
					resetProduct();
				}
				
			}




		}
		/*console.log("set Filtered Products!!!!!!!!");
	 	setFilteredProducts(
	 		products.filter(item => 
	 			Object.entries(filters).every(([key, value])=>
	 				/*if (key == "category") {
	 					
	 					item["category"].includes(value)
	 				}
	 				else {/*
	 					//item[key].toLowerCase().includes(value.toLowerCase())
	 					item['sku'].toLowerCase().includes(value.toLowerCase()) || item['title'].toLowerCase().includes(value.toLowerCase()) || item["category"].indexOf(value) > -1
	 				//}value[0]
	 				//item['title'].includes('YORK')
	 				
	 			)
	 		)
	 	);*/
	}, [products, filters, resetAll]);

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

