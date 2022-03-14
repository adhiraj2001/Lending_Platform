const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

// Create Schema
const RequestSchema = new Schema({
    borrower_name: {
        type: String,
        required: true
    },
    borrower_email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "Pending"
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

RequestSchema.plugin(mongoose_fuzzy_searching, { fields: ["name"] });
module.exports = Request = mongoose.model("Request", RequestSchema);
