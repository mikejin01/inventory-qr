const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type:String, required: true },
		sku:{ type: String, required: true, unique: true },
		desc:{ type: String, required: false },
		img: { type: String, required: false },
		category: { type: Array, required: false },
		size: { type: Array },
		color: { type: Array },
		price: { type: Number, required: false },
		cost: { type: Number, required: true },
		stockQuantity: { type: Number, default: 0 }
	}, 
	{timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);
