const express = require("express");
const router = express.Router();

const Check = require("validator");
const isEmpty = require("is-empty");

// Load User model
const User = require("../models/User");
const Request = require("../models/Request");

const ObjectID = require('mongodb').ObjectId;

var valid = data => {

    // error object
    let errors = {};

    if (!Check.isInt(data.amount + "")) {
        errors.amount = `Amount should be an Integer : ${data.amount + ""}`;
    }
    else if ((data.amount + 0) <= 0) {
        errors.amount = `Amount should be a positive Integer : ${data.amount}`;
    }

	// // Password checks
	// if (Check.isEmpty(data.password)) {
	// 	errors.password = "Password field is required";
	// }
    
    return { isValid: isEmpty(errors), errors };
};

//* @route GET request 
//* @desc Getting all the requests
//* @access Public
router.get("/", function (req, res) {
    Request.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});


//* @route POST /requests/create
//* @desc create request
//* @access Public
router.post("/add", (req, res) => {

    const { errors, isValid } = valid(req.body);
    
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
    
    const newRequest = new Request({
        borrower_name: req.body.borrower_name,
        borrower_email: req.body.borrower_email,
        amount: req.body.amount
    });
    
    newRequest.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//* @route POST /requests/update
//* @borrower_desc Update Borrower
//* @access Public
router.post("/update", (req, res) => {

    const { isValid, errors } = valid(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Request.updateOne(
        { "_id": ObjectID(req.body._id) },  // <-- find stage
            { $set: {                // <-- set stage
                borrower_name: req.body.borrower_name,
                borrower_email: req.body.borrower_email,
                amount: req.body.amount,
                status: req.body.status 
            }
        }   
    )
    .then(items => {
        if (items.nModified == 0) {
            res.status(400).json({ error: "Request not Found!", request: req.body });
        }
        else {
            res.status(200).json(items);
        }
    })
    .catch(err => {
        res.status(400).json({ borrower_email: "Borrower Email doesn't exist", error: err });
    });
});

//* @route POST /requests/delete
//* @desc Delete request
//* @access Public
router.post('/delete', (req, res) => {
    Request.findById(ObjectID(req.body._id))
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});



//* @route POST /request/view
//* @desc view all requests
//* @access Public
router.post("/view", (req, res) => {
    Request.find({ borrower_email: req.body.borrower_email })
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err));
});

module.exports = router;