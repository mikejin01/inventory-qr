const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
	{
		userId: { type:String, required: true },
		prodct: [
			{
				productId:{
					type: String,
				},
				quantity:{
					type: Number,
					default: 1,
				}
			}
		],
	}, 
	{timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);