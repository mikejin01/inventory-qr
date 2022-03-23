import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../responsive"
import { Search, ShoppingCartOutlined, AddCircleOutlined } from '@material-ui/icons'
import { BrowserRouter as  Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

const Container = styled.div`
`
const Title = styled.h1`
	margin: 20px;
`
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`
const Filter = styled.div`
	margin: 20px;
	${mobile({ width: "0px 20px", display: "flex", flexDirection:"column" })};
`
const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: "0px" })};
`
const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })};
`

const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`
const Input = styled.input`
	border: none;
	${mobile({ width: "50px" })};
`

const Option = styled.option`
`
const Inventory = () => {
	const location = useLocation();
	const category = 'sofa';//location.pathname.split("/")[2];
	console.log("category is "+category+"!!!!!");
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value.toLowerCase,
		});
	};
	console.log(filters);
	const handleSearch = (e)=> {
		//console.log("handleSearch!!!!!!!!!!"+e.target.value);
		//const value = e.target.value;
		console.log("handleSearch: "+e.target.value); //.toLowerCase
		setFilters({
			...filters,
			["sku"]: e.target.value.toLowerCase(),// e.target.value.toLowerCase() "meble-eva-kbl",//onChange=
		});
	}
	return(
		<Container>
			<Title>{category}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option disabled>
							Color
						</Option>
						<Option>White</Option>
						<Option>Black</Option>
						<Option>Red</Option>
						<Option>Blue</Option>
						<Option>Yellow</Option>
					</Select>
				</Filter>
				<Filter>
					<SearchContainer name="sku">
						<Input placeholder="Search" onChange={handleSearch} />
						<Search style={{color:"gray", fontSize:16}} onClick={handleSearch}/>
					</SearchContainer>
				</Filter>
				<Filter>
					<FilterText>
						<Link to={`/NewProduct`}>
						<AddCircleOutlined style={{color:"gray", fontSize:16}}/>
						Add Product
						</Link>
					</FilterText>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={e=>setSort(e.target.value)}>
						<Option value="newest">
							Newest
						</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
				
			</FilterContainer>
			<Products category={category} filters={filters} sort={sort} />
		</Container>
		) 
}

export default  Inventory

