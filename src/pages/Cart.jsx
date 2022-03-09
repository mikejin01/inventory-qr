import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { mobile } from "../responsive"

const Container = styled.div`
`
const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })};
`
const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`
const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${props=>props.type === "filled" && "none"};
	background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
	color: ${props=>props.type === "filled" && "white"};
`

const TopTexts = styled.div`
	${mobile({ display: "none" })};
`

const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;

`

const Bottom = styled.div`
	display: flex;
	justify-content: center;
	${mobile({ flexDirection: "column" })};
`
const Info = styled.div`
	flex: 3;
`
const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })};
`
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`
const Image = styled.img`
	width: 200px;
`
const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const ProductName = styled.span`
	flex: 3;
`
const ProductSku = styled.span`
	flex: 3;
`
const ProductVariation = styled.span`
	flex: 3;
`
const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props => props.color}
`
const ProductSize = styled.span`
`
const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

`
const ProductQuantityContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`
const ProductQuantity = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })};
`
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })};
`
const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
	/*background-color: red;*/
`
const SummaryTitle = styled.h1`
	font-weight: 200;
`
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${props=>props.type === "total" && "500"};
	font-size: ${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`


const Cart = () => {
	return(
		<Container>
			<Announcement />
			<Navbar />
			<Wrapper> 
				<Title>Your Cart</Title>

				<Top>
					<TopButton>CONTINUE SHOPPING</TopButton>
					<TopTexts>
						<TopText>Shopping Cart (2)</TopText>
						<TopText>Your Wishlist (0)</TopText>
					</TopTexts>
					<TopButton type="filled">CHECKOUT NOW</TopButton>
				</Top>

				<Bottom>
					<Info>
						<Product>
							<ProductDetail>
								<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000186-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg"/>
								<Details>
									<ProductSku><b>SKU:</b>ASH-999</ProductSku>
									<ProductName><b>Product:</b>JESSIE WALL DECOR</ProductName>
									<ProductVariation>REGULAR</ProductVariation>
									<ProductColor color="black"></ProductColor>
									<ProductSize>L</ProductSize>
								</Details>
							</ProductDetail>
							<PriceDetail>
								<ProductQuantityContainer>
									<Add/>
									<ProductQuantity>2</ProductQuantity>
									<Remove/>
								</ProductQuantityContainer>
								<ProductPrice>$99</ProductPrice>
							</PriceDetail>
						</Product>
						<Hr/>
						<Product>
							<ProductDetail>
								<Image src="https://amdiscountfurniture.com/wp-content/uploads/2022/02/A8000186-10X8-CROPAFHS-PDP-Zoomed-1200x800.jpg"/>
								<Details>
									<ProductSku><b>SKU:</b>ASH-999</ProductSku>
									<ProductName><b>Product:</b>JESSIE WALL DECOR</ProductName>
									<ProductVariation>REGULAR</ProductVariation>
									<ProductColor color="black"></ProductColor>
									<ProductSize>L</ProductSize>
								</Details>
							</ProductDetail>
							<PriceDetail>
								<ProductQuantityContainer>
									<Add/>
									<ProductQuantity>2</ProductQuantity>
									<Remove/>
								</ProductQuantityContainer>
								<ProductPrice>$99</ProductPrice>
							</PriceDetail>
						</Product>
					</Info>
					<Summary>
					<SummaryTitle>ORDER SUMMARY</SummaryTitle>
					<SummaryItem>
						<SummaryItemText>Subtotal</SummaryItemText>
						<SummaryItemPrice>$188</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Estimated Shipping</SummaryItemText>
						<SummaryItemPrice>$39</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Shipping Discount</SummaryItemText>
						<SummaryItemPrice>-$20</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem type="total">
						<SummaryItemText >Total</SummaryItemText>
						<SummaryItemPrice>$200</SummaryItemPrice>
					</SummaryItem>
					<Button>CHECKOUT NOW</Button>
					
					</Summary>>
				</Bottom>
			</Wrapper>
			
			<Newsletter />
			<Footer />
			
		</Container>
		) 
}

export default  Cart

