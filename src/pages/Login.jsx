import React from 'react'
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(225, 225, 225, 0.5), rgba(225, 225, 225, 0.5)), 
	url("https://amdiscountfurniture.com/wp-content/uploads/2022/02/Bedroom-Furniture_Modern-Bedrooms-QS-and-KS_Tesla-Bed_1603300873_side_16-1200x800.png") center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	width: 25%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "85%" })};
`
const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
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

const Link = styled.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;

`

const Login = () => {
	return(
		<Container>
			<Wrapper>
			<Title>SIGN IN</Title>
			<Form>
				<Input placeholder="email"/> 
				<Input placeholder="Password"/> 
				<Button>LOGIN</Button>
				<Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
				<Link>CREATE A NEW ACCOUNT</Link>
			</Form>
			</Wrapper>
		</Container>
		) 
}

export default  Login

