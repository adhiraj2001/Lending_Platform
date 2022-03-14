import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

class Add_Request extends Component {
    constructor(props) {

        super(props);

        this.state = {
            borrower_name: "",
            borrower_email: "",
            amount: 0
        };

        this.state.borrower_name = ls.get("name");
        this.state.borrower_email = ls.get("email");
    }

    onChangeAmount = e => {
        this.setState({
            amount: e.target.value
        });
    }

    addAmount = e => {
        this.setState({
            amount: this.state.amount + 5
        });
    };

    badAmount = e => {
        this.setState({
            amount: this.state.amount - 5
        });
    };

    //* Add Request
    onSubmit = e => {
        e.preventDefault();

        const newRequest = {
            
            borrower_name: this.state.borrower_name,
            borrower_email: this.state.borrower_email,
            amount: this.state.amount
        };

        console.log(newRequest);

        axios.post("http://localhost:4000/requests/add", newRequest)
            .then(res => {
                console.log(res.data);

                alert("Buyer Updated Successfully");
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data.amount);
                alert(err.response.data[Object.keys(err.response.data)[0]]);
            });
    };



    render = () => {
        return (
            <Box container sx={{ marginTop: 8, marginLeft: 'auto', marginRight: 'auto', width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff9c4' }}>

                <Typography component="h3" variant="h3">
                    Add Request
                </Typography>

                <FormControl onSubmit={this.onSubmit_buyer} sx={{ m: 5, minWidth: 120 }}>

                    <div>
                        <TextField id="amount" label="Amount" type="number" variant="outlined" value={this.state.amount} onChange={this.onChangeAmount} sx={{ mt: 3 }} required />

                        <IconButton aria-label="add-amount" onClick={this.addAmount} sx={{ mt: 3, ml: 3 }}>
                            <AddBoxIcon> Filled </AddBoxIcon>
                        </IconButton>
                        
                        <IconButton aria-label="bad-amount" onClick={this.badAmount} sx={{ mt: 3, ml: 3 }}>
                            <IndeterminateCheckBoxIcon> Filled </IndeterminateCheckBoxIcon>
                        </IconButton>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={this.onSubmit}
                    >
                        Add
                    </Button>

                </FormControl>
            </Box>
        );
    }
}

export default Add_Request;