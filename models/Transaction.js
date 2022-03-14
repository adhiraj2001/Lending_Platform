const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	borrower_email: {
		type: String,
		required: true
	},
	lender_email: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		default: "Borrowed"
	},
	date: {
		type: Date,
		required: false,
		default: Date.now
	}
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);