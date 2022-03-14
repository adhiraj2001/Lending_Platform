const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
	date: {
		type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = User = mongoose.model("user", UserSchema);