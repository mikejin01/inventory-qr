const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
	const newProduct = new Product(req.body);
	try{
		//res.status(200).json("!!!!!!");
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try{
		//res.status(200).json("!!!!!!");
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id, 
			{ $set: req.body }, 
			{ new: true }
		);
		res.status(200).json(updatedProduct)
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Product has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
})

//GET Product
router.get("/find/:id", async (req, res) => {
	const query = req.query.new
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json( product );
	} catch (err) {
		res.status(500).json(err);
	}
})

//GET ALL Products
router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;
		if(qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(10); 
		} else if (qCategory) {
			products = await Product.find({
				category: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}

		res.status(200).json( products );
	} catch (err) {
		res.status(500).json(err);
	}
})
/*
//GET Product STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
	const date =  new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
	try {
		const data = await Product.aggregate([
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

