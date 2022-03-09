import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const KEY = "pk_test_51KWRnOAMTzXQCPFxmA8ofCeCnmwnJj70w5ZqEyD48BJxZ4EHwO4XgfLTacpf2HplVvgNaEgtPtnrAORfvqxLj1iz00wi772kKA"

const Pay = () => {
	console.log("hi!!!!!!!!!!!!!")
	const [stripeToken, setStripeToken] = useState(null);

	const navigate  = useNavigate();
	const onToken = (token) => {
		//console.log(token);
		console.log("token on!!!!!!!!!!!!!");
		setStripeToken(token);
	}

	useEffect(() => { 
		const makeRequest = async () => {
 			try {
				const res = await axios.post(
					"http://localhost:5000/api/checkout/payment",
					{ 
						tokenId: stripeToken.id,
						amount: 100,
					}
				);
				console.log(res.data);
				navigate("/success"); //, {res.data}
			} catch (err) {
				console.log(err);
			}
		};
		//stripeToken && makeRequest;
		//stripeToken && makeRequest();
		if (stripeToken) {
			console.log("makeRequest()!!!!!!!!!!!!!");
			makeRequest();
		}
	}, [stripeToken, navigate]);

	return (
		<div 
			style={{
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
		{stripeToken ? (<span>Processing. Please wait...</span>) :(


			<StripeCheckout 
				name="Furnishing Warehouse" 
				image="https://nextivaweb.imgix.net/logos/Nextiva-Logo.svg?auto=format"
				billingAddress = ""
				shippingAddress = ""
				description = "Your total is $999"
				amount = {100}
				token = {onToken}
				stripeKey = {KEY}
			>
				<button
					style={{
						border: "none",
						width: 120,
						borderRadius: 5,
						padding: "20px",
						backgroundColor: "black",
						color: "white",
						fontWeight: "600",
						cursor: "pointer",
					}}
				>
					Pay Now
				</button>
			</StripeCheckout>
			)};
			
		</div>
	);
	
}

export default Pay