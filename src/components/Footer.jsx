import styled from "styled-components"
import { Facebook, Instagram, Twitter, YouTube, Room, Phone, MailOutline } from '@material-ui/icons'
//import YouTubeIcon from '@mui/icons-material/YouTube';
import { mobile } from "../responsive"

const Container = styled.div`
	display: flex;
	${mobile({ flexDirection: "column "})};
`
const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`
const Logo = styled.h1 `
	margin: 20px 0px;
`
const Desc = styled.p`
	flex: 1;
`
const SocialContainer = styled.div`
	display: flex;
`
const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${props=>props.color}
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`

const Title = styled.h3`
	margin-bottom: 30px;
`

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	flex-wrap: wrap;
	display: flex;
	flex-warp: wrap;/**/
`
const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;

`
const Center = styled.div`
	flex: 1;
	padding: 20px;
	/*$ {mobile({ display: "none " })};*/
` 
const Right = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ backgroundColor: "#eee "})};
`
const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`
const Payment = styled.img`
	width: 50%;
`


const Footer = () => {
	return(
		<Container> 
			<Left>
				<Logo>Furnishing Warehouse</Logo>
				<Desc>With global headquarters and an extensive network of logistics hubs and customer service centers, we’re here to create that feeling of home for everyone, anywhere.</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<Facebook/>
					</SocialIcon>
					<SocialIcon color="E4405F">
						<Instagram/>
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<Twitter/>
					</SocialIcon>
					<SocialIcon color="E60023">
						<YouTube/>
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Links</Title>
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Wall Art</ListItem>
					<ListItem>Wall Decor</ListItem>
					<ListItem>Rug</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
				<Room style={{marginRight:"10px;"}} />120 Fulton Ave Hempstead, NY 11550 
				</ContactItem>
				<ContactItem>
				<Phone style={{marginRight:"10px;"}} />+1(516) 280-9565 
				</ContactItem>
				<ContactItem>
				<MailOutline style={{marginRight:"10px;"}} />amdiscountfurniture@gmail.com 
				</ContactItem>
				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
				
			</Right>

		</Container>
		) 
}

export default Footer

