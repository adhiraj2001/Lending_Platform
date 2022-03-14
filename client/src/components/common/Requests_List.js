import { useState, useEffect } from "react";
import axios from "axios";
import ls from "local-storage";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fontWeight } from "@mui/system";

const Requests_List = (props) => {
    const [requests, setRequests] = useState([]);
    const [sortedRequests, setSortedRequests] = useState([]);

    const [borrowers, setBorrowers] = useState([]);
     
    // const [sortName, setSortName] = useState(true);
    const [sortAmount, setSortAmount] = useState(true);

    const [searchText, setSearchText] = useState("");

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(1000);

    const [borrowerName, setBorrowerName] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:4000/requests")
            .then((res) => {
                    console.log(res.data);
                    setRequests(res.data);
                    setSortedRequests(res.data);
                    setSearchText("");
                })
            .catch((err) => {
                console.log(err);
            });
        
        // rowQuantity.length = products.length;
        // rowQuantity.fill(1);
        
        axios
            .get("http://localhost:4000/users")
            .then((res) => {
                    console.log(res.data); 
                    setBorrowers(res.data);
                })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // const sortChange = () => {
    //     let productsTemp = products;
    //     const flag = sortName;
        
    //     productsTemp.sort((a, b) => {
    //         if (a.date != undefined && b.date != undefined) {
    //             return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
    //         }
    //         else {
    //             return 1;
    //         }
    //     });
      
    //     setSortedProducts(productsTemp);
    //     setSortName(!sortName);
    // };

    const sortChange1 = () => {
        let requestsTemp = requests;
        const flag = sortAmount;
        
        requestsTemp.sort((a, b) => {
            if (a.amount != undefined && b.amount != undefined) {
                return (1 - flag * 2) * (a.amount - b.amount);
            }
            else {
                return 1;
            }
        });
        
        setSortedRequests(requestsTemp);
        setSortAmount(!sortAmount);
    };

    const onChangeSearchText = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };

    const onChangeMin = (event) => {
        console.log(event.target.value);

        if (event.target.value.length === 0) {
            setMinVal(0);
        }
        else {
            setMinVal(event.target.value);
        }
            
        console.log(`min_val: ${minVal}`);
    };

    const onChangeMax = (event) => {
        console.log(event.target.value);

        if (event.target.value.length === 0) {
            setMaxVal(1000);
        }
        else {
            setMaxVal(event.target.value);
        }
            
        console.log(`max_val: ${maxVal}`);
    };

    const onChangeBorrowerName = (event) => {
        console.log(event.target.value);
        setBorrowerName(event.target.value);
    };

    const onTransaction = args => event => {
        event.preventDefault();

        const newAmount = sortedRequests[args].amount;

        const newTransaction = {
            borrower_email: sortedRequests[args].borrower_email,
            lender_email: ls.get("email"),
            amount: newAmount
        };

        console.log(newTransaction);

        if (newAmount > ls.get("balance")) {
            alert(`Sorry you don't have enough blance to make the transfer:[${newAmount}]`);
            window.location.reload();
            return;
        }

        axios
            .post("http://localhost:4000/transactions/add", newTransaction)
            .then((res) => {

                console.log(res.data);
                
                const updateRequest = {
                    _id: sortedRequests[args]._id,
                    borrower_name: sortedRequests[args].borrower_name,
                    borrower_email:  sortedRequests[args].borrower_email,
                    amount: newAmount,
                    status: "Complete"
                };

                console.log(updateRequest);

                // TODO: Maybe DELETE or remove button
                
                axios
                    .post("http://localhost:4000/requests/update", updateRequest)
                    .then((res) => {
                        // console.log("WORKING");
                        console.log(res.data);
                        sortedRequests[args].status = "Complete";
                    })
                    .catch((err) => {
                        console.log(err);

                        console.log(err.response.data);
                        alert(err.response.data[Object.keys(err.response.data)[0]]);

                        window.location.reload();
                        return;
                    });

                const remBalance = ls.get("balance") - newAmount;
                const updateUser = {
                    name: ls.get("name"),
                    email: ls.get("email"),      // <-- id not _id
                    password: ls.get("password"),
                    contact_no: ls.get("contact_no"),
                    age: ls.get("age"),
                    balance: remBalance,
                }

                axios
                    .post("http://localhost:4000/users/update", updateUser)
                    .then((res) => {
                        console.log(res.data);
                        ls.set("balance", remBalance);
                    })
                    .catch((err) => {
                        console.log(err);

                        console.log(err.response.data);
                        alert(err.response.data[Object.keys(err.response.data)[0]]);
                
                        window.location.reload();
                        return;
                    });

                axios
                    .post("http://localhost:4000/users/find", {email: sortedRequests[args].borrower_email})
                    .then((res) => {
                        console.log(res.data);
                        const newBalance = res.data.balance + newAmount;
                        const updateBorrower = {
                            _id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                            password: res.data.password,
                            contact_no: res.data.contact_no,
                            age: res.data.age,
                            balance: newBalance,
                        }

                        axios
                            .post("http://localhost:4000/users/update", updateBorrower)
                            .then((res) => {
                                console.log(res.data);
                                ls.set("balance", newBalance);
                            })
                            .catch((err) => {
                                console.log(err);

                                console.log(err.response.data);
                                alert(err.response.data[Object.keys(err.response.data)[0]]);

                                window.location.reload();
                                return;
                            });
                    })
                    .catch((err) => {
                        console.log(err);

                        console.log(err.response.data);
                        alert(err.response.data[Object.keys(err.response.data)[0]]);

                        window.location.reload();
                        return;
                    });

                alert(`Transfered successfully!`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);

                console.log(err.response.data);
                alert(err.response.data[Object.keys(err.response.data)[0]]);

                window.location.reload();
            });
    }

    return (
        <div>
        <Grid container>
            <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
                <ListItem button>
                <h2>Balance : <span> {ls.get('balance')} units </span> </h2>
                </ListItem>
                <ListItem text>
                <h1>Filters</h1>
                </ListItem>
            </List>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
            <List component="nav" aria-label="mailbox folders">
                <TextField
                    id="standard-basic"
                    label="Search"
                    fullWidth={true}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                            
                    onChange={onChangeSearchText}
                />
            </List>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        Amount
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Enter Min"
                        type="number"
                        fullWidth={true}
                        placeholder={minVal}
                        onChange={onChangeMin}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Enter Max"
                        type="number"
                        width={100}
                        placeholder={maxVal}
                        onChange={onChangeMax}
                    />
                    </Grid>
                </Grid>
                </ListItem>
                {/* <Divider />
                <ListItem divider>
                <Autocomplete
                    id="combo-box-demo"
                    options={borrowers}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Selected Name"
                        variant="outlined"
                        onChange={onChangeBorrowerName}
                    />
                    )}
                />
                </ListItem> */}
            </List>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
            <Paper>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> 
                            Sr No.
                        </TableCell> 

                        { //TODO: Date
                        /* <TableCell align="center">
                            {" "}
                            <Button onClick={sortChange}>
                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                            Date
                        </TableCell> */}
                        <TableCell align="center">
                            Name
                        </TableCell>
                        <TableCell align="center">
                            Email
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <Button onClick={sortChange1}>
                                {sortAmount ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                            Amount
                        </TableCell>
                        {/* <TableCell align="center">
                            Status
                        </TableCell> */}
                        <TableCell align="center">
                            Lend
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRequests.map((request, ind) => {
                        if (request.borrower_name.toLowerCase().includes(searchText.toLowerCase()) && request.amount >= minVal && request.amount <= maxVal) {

                            return (
                            <TableRow key={ind}>
                                <TableCell align="center">{ind + 1}</TableCell>
                                {/* <TableCell align="center">{product.date}</TableCell> */}
                                <TableCell align="center">{request.borrower_name}</TableCell>
                                <TableCell align="center">{request.borrower_email}</TableCell>
                                <TableCell align="center">{request.amount}</TableCell>
                                {/* <TableCell align="center">{request.status}</TableCell> */}
                                {request.status === "Complete" ? (
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={onTransaction(ind)} style={{backgroundColor: '#12824C', color: '#FFFFFF'}} disabled> Done </Button>
                                    </TableCell>
                                ) : (
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={onTransaction(ind)}> Lend </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                            );
                        }
                    })}
                </TableBody>
                </Table>
            </Paper>
            </Grid>
        </Grid>
        </div>
    );
};

export default Requests_List;
