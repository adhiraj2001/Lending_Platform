const express = require("express");
const router = express.Router();

const Check = require("validator");
const isEmpty = require("is-empty");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");
const keys = require("../config/keys");

const ObjectID = require('mongodb').ObjectId;


var valid = data => {

    // error object
    let errors = {};


    if (!Check.isEmail(data.email + "")) {
		errors.email = "Email is invalid";
    }


    if (!Check.isLength(data.password + "", { min: 6 })) {
		errors.password = "Password should be of atleast length 6.";
    }

    // if(!Check.isStrongPassword(data.password + "", { minLength: 6, minSymbols: 0 })) {
    //     errors.password = "Password should be of atleast length 6 with at least 1 upper case, 1 lower case and 1 number.";
    // }


    if (!Check.isInt(data.contact_no + "")) {
        errors.contact_no = "Contact No. should be an Integer";
    }
    else if ((data.contact_no + 0) <= 0) {
        errors.contact_no = "Contact No. should be a positive integer";
    }
    else if (!Check.isLength((data.contact_no + ""), { min:10, max: 10 })) {
        errors.contact_no = "Contact No. required of length 10";
    }


    if (!Check.isInt(data.age + "")) {
        errors.age = "Age should be an Integer";
    }
    else if (((data.age + 0) || 0) < 18) {
        errors.age = `Age should be greater than 18: ${data.age}`;
    }


    if (!((data.balance || 0) >= 0)) {   
        errors.balance = `Balance should be a positive integer: ${(data.balance || 0)}`;
    }

	// // Password checks
	// if (Check.isEmpty(data.password)) {
	// 	errors.password = "Password field is required";
	// }
    
    return { isValid: isEmpty(errors), errors };
};


//* @route GET request 
//* @desc Getting all the users
//* @access Public
router.get("/", function (req, res) {
    User.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

//* @route POST /users/register
//* @desc Register user
//* @access Public
router.post("/register", (req, res) => {

    const { isValid, errors } = valid(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(items => {
            if (items) {
			    return res.status(400).json({ email: "Email already exists" });
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    contact_no: req.body.contact_no,
                    age: req.body.age,
                });
                
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(item => {
                                res.status(200).json(item);
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            });
                    });
                });
            }
        });
});


//* @route POST api/users/login
//* @desc Login User
//* @access Public
router.post("/login", (req, res) => {

	// Find user by email
    User.findOne({ email: req.body.email }).then(items => {
        
		// Check if user email exists
		if (!items) {
			return res.status(404).json({ error: "User Email not found" });
        }

        // Check password
        bcrypt.compare(req.body.password, items.password)
            .then(isMatch => {
                if (isMatch) {
                    res.json(items);
                }
                else {
                    res.status(400).json({
                        error: "User Password Incorrect"
                    });
                }
            })
            .catch(err => {
                res.status(400).json({ password: "Password did not match.", error: err });
            });
        
	});
});


//* @route POST /users/find
//* @desc Find user
//* @access Public
router.post("/find", (req, res) => {

	// Find user by email
    User.findOne({ email: req.body.email }).then(items => {
        
		// Check if user email exists
        if (items) {
            res.status(200).json(items);
        }
        else {
            res.status(404).json({ error: "User Email not found", email: req.body.email });
        }
        
	});
});


//* @route POST /users/update
//* @desc Update user
//* @access Public
router.post("/update", (req, res) => {

    const { isValid, errors } = valid(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.updateOne(
        { email: req.body.email },  // <-- find stage
            { $set: {                // <-- set stage
                name: req.body.name,     
                email: req.body.email,      // <-- id not _id
                password: req.body.password,
                contact_no: req.body.contact_no,
                age: req.body.age,
                balance: req.body.money
            } 
        }   
    )
    .then(items => {
        res.status(200).json(req.body);
    })
    .catch(err => {
        res.status(400).json({ email: "User Email doesn't exist", error: err });
    });
});

module.exports = router;

