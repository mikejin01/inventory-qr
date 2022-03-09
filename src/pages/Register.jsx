import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(225, 225, 225, 0.5), rgba(225, 225, 225, 0.5)), 
	url("https://amdiscountfurniture.com/wp-content/uploads/2021/03/Aura_zero2_white_z9x8ri-1200x800.jpg") center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	width: 40%;
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
	flex-wrap: wrap;
`

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`
const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`
const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`

const Register = () => {
	return(
		<Container>
			<Wrapper>
			<Title>CREATE AN ACCOUNT</Title>
			<Form>
				<Input placeholder="First Name"/> 
				<Input placeholder="Last Name"/> 
				<Input placeholder="Username"/> 
				<Input placeholder="email"/> 
				<Input placeholder="Password"/> 
				<Input placeholder="Confirm Password"/> 
				<Agreement>
				Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
				</Agreement>
				<Button>CREATE</Button>
			</Form>
			</Wrapper>
		</Container>
		) 
}

export default  Register

