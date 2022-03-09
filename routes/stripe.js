const router = require("express").Router();
const dotenv = require('dotenv');
//const stripe = require("stripe")(process.env.STRIPE_KEY);
const stripe = require("stripe")("sk_test_51KWRnOAMTzXQCPFxHBXilNvYYr2QVGlUH7a0vXl413VcLpQ4FDQRFF9HNcM8TeGi2eWAADXIb9V3cXdUVpFHJ4Vx00Y6sf2wnt");


//CREATE
router.post("/payment",  async/**/ (req, res) => {
	console.log("!!!CREATE hi!!!!!!!!!")
	console.log("STRIPE_KEY "+process.env.STRIPE_KEY)
	console.log("tokenId " + req.body.tokenId);
	console.log("amount " + req.body.amount);
	const resCharges = await stripe.charges.create(
	{
		source: req.body.tokenId,
		amount: req.body.amount,
		currency: "usd",
	}, 
	(stripeErr, stripeRes)=>{
		if (stripeErr) {
			res.status(500).json(stripeErr);
		}else{
			res.status(200).json( stripeRes );
		}
	});
});

module.exports = router;

