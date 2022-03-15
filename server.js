const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// const passport = require('passport');


const DB_NAME = 'lending_platform';

const connectionString = 'mongodb://127.0.0.1:27017/' + DB_NAME;
// const connectionString = 'mongodb://mongo:27017/' + DB_NAME;    // for docker container

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//* Connect to MongoDB Atlas
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// //* Connection to MongoDB
// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log('Error: ' + err));


const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
});


//* Passport middleware
// app.use(passport.initialize());

//* Passport config
// require("./config/passport_buyer")(passport);
// require("./config/passport_vendor")(passport);

//* routes
var UserRouter = require("./routes/UserAPI");
var RequestRouter = require("./routes/RequestAPI");
var TransactionRouter = require("./routes/TransactionAPI");


//* setup API endpoints
app.use("/users", UserRouter);
app.use("/requests", RequestRouter);
app.use("/transactions", TransactionRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
