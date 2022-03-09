import StripeCheckout from 'react-stripe-checkout';
const KEY = "pk_test_51KWRnOAMTzXQCPFxmA8ofCeCnmwnJj70w5ZqEyD48BJxZ4EHwO4XgfLTacpf2HplVvgNaEgtPtnrAORfvqxLj1iz00wi772kKA"

const Success = () => {

	const onToken = (token) => {
		console.log(token);
	}

	return (
		<div 
			style={{
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>

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
					Success!
				</button>

			
			
		</div>
	)
}

export default Success