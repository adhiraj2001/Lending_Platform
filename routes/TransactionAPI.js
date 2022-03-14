const express = require("express");
const router = express.Router();

const Check = require("validator");
const isEmpty = require("is-empty");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const Transaction = require("../models/Transaction");
const keys = require("../config/keys");

const ObjectID = require('mongodb').ObjectId;


//* @route GET request
//* @desc Getting all the transactions
//* @access Public
router.get("/", function (req, res) {
    Transaction.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});


//* @route POST /transactions/add
//* @desc add Transaction
//* @access Public
router.post("/add", (req, res) => {
    const newTransaction = new Transaction({
        lender_email: req.body.lender_email,
        borrower_email: req.body.borrower_email,
        amount: req.body.amount
    });

    newTransaction.save()
        .then(item => {
            return res.status(200).json(item);
        })
        .catch(err => {
            return res.status(400).send(err);
        });
});

router.post("/update", (req, res) => {

    Transaction.updateOne(
        { "_id": ObjectID(req.body._id) },  // <-- find stage
            { $set: {                // <-- set stage
                lender_email: req.body.lender_email,
                borrower_email: req.body.borrower_email,
                amount: req.body.amount,
                status: req.body.status
            }
        }   
    )
    .then(items => {
        if (items.nModified == 0) {
            res.status(400).json({ error: "Transaction not Found!", transaction: req.body });
        }
        else {
            res.status(200).json(items);
        }
    })
    .catch(err => {
        res.status(400).json({ email: "Buyer Email doesn't exist", error: err });
    });
});


//* @route POST /transactions/view
//* @desc view all Transactions
//* @access Public
router.post("/view_borrower", (req, res) => {
    Transaction.find({ borrower_email: req.body.borrower_email })
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err));
});


//* @route POST /transactions/view
//* @desc view all transactions
//* @access Public
router.post("/view_lender", (req, res) => {
    Transaction.find({ lender_email: req.body.lender_email })
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err));
});

module.exports = router;