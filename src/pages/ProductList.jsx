import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../responsive"
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

const Option = styled.option`
`

/*
<Filter></Filter>
				<Filter></Filter>
				<Filter></Filter>
				Wall Decor
*/

const ProductList = () => {
	const location = useLocation();
	const category = location.pathname.split("/")[2];
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
					<Select name="material" onChange={handleFilters}>
						<Option disabled>
							Material
						</Option>
						<Option>Metal</Option>
						<Option>Wood</Option>
						<Option>Marble</Option>
					</Select>
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

export default  ProductList

