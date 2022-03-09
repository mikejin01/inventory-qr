const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");

//CREATE
router.post("/", verifyToken, async (req, res) => {
	const newCart = new Cart(req.body);
	try{
		//res.status(200).json("!!!!!!");
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try{
		//res.status(200).json("!!!!!!");
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id, 
			{ $set: req.body }, 
			{ new: true }
		);
		res.status(200).json(updatedCart)
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json("Cart has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
})

//GET USER Cart
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
	const query = req.query.new
	try {
		const userCart = await Cart.findOne({userId: req.params.userId});
		res.status(200).json( userCart );
	} catch (err) {
		res.status(500).json(err);
	}
})


//GET ALL Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json( carts );
	} catch (err) {
		res.status(500).json(err);
	}
})

/*
//GET Cart STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
	const date =  new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
	try {
		const data = await Cart.aggregate([
			{$match: {createdAt: {$gte: lastYear}}},
			{
				$project: {
					month: {$month: "$createdAt"},
				},
			},
			{
				$group:{
					_id: "$month",
					totoal: {$sum: 1},
				},
			},
		]);
		res.status(200).json( data );
	} catch (err) {
		res.status(500).json(err);
	}
})/**/


module.exports = router;

