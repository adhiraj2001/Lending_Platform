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

class Profile extends Component {

    constructor(props) {
        super(props);
        
		this.state = {
            name: "",
            email: "",
            password: "",
            contact_no: 0,
            age: 0,
            balance: 0
        };

        this.state.name = ls.get("name");
        this.state.email = ls.get("email");
        this.state.password = ls.get("password");
        this.state.contact_no = ls.get("contact_no");
        this.state.age = ls.get("age");
        this.state.balance = ls.get("balance");
    }

    onChangeName = e => {
        this.setState({
            name: e.target.value
        });
    };

    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        });
    };

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    onChangeContact_no = e => {
        this.setState({
            contact_no: e.target.value
        });
    };

    onChangeAge = e => {
        this.setState({
            age: e.target.value
        });
    };

    addBalance = e => {
        this.setState({
            balance: this.state.balance + 10
        });
    };

    badBalance = e => {
        this.setState({
            balance: this.state.balance - 10
        });
    };


    // onChange = e => {
    //     e.persist();
	// 	this.setState({ [e.target.id]: e.target.value });
    // };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact_no: this.state.contact_no,
            age: this.state.age,
            balance: this.state.balance
        };

        console.log(newUser);

        axios.post("http://localhost:4000/users/update", newUser)
            .then(res => {
                console.log(res.data);

                ls.set("login", "true");

                ls.set("name", res.data.name);
                ls.set("email", res.data.email);
                ls.set("password", res.data.password);
                ls.set("contact_no", res.data.contact_no);
                ls.set("age", res.data.age);
                ls.set("balance", res.data.balance);

                alert("User Updated Successfully");
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data);
                alert(err.response.data[Object.keys(err.response.data)[0]]);
            });
    };

     
    render = () => {

        // const { errors } = this.state;
        // const { user_type } = this.state;
        
        return (
            <Box container sx={{ marginTop: 8, marginLeft: 'auto', marginRight: 'auto', width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff9c4' }}>

                <Typography component="h1" variant="h3">
                    User Profile
                </Typography>

                <FormControl onSubmit={this.onSubmit_buyer} sx={{ m: 5, minWidth: 120 }}>

                    <div>
                        <TextField id="name" label="Name" type="text" variant="outlined" placeholder={this.state.name} value={this.state.name} onChange={this.onChangeName} sx={{ mt: 3 }} />
                    </div>
                    
                    <div>
                        <TextField id="email" label="Email" type="email" variant="outlined" placeholder={this.state.email} value={this.state.email} onChange={this.onChangeEmail} sx={{ mt: 3 }} disabled />
                    </div>

                    <div>
                        <TextField id="password" label="Password" type="password" variant="outlined" placeholder={this.state.password} value={this.state.password} onChange={this.onChangePassword} sx={{ mt: 3 }} disabled />
                    </div>

                    <div>
                        <TextField id="contact_no" label="Contact No." type="number" variant="outlined" placeholder={this.state.contact_no} value={this.state.contact_no} onChange={this.onChangeContact_no} sx={{ mt: 3 }} />
                    </div>

                    <div>
                        <TextField id="age" label="Age" type="number" variant="outlined" placeholder={this.state.age} value={this.state.age} onChange={this.onChangeAge} sx={{ mt: 3 }} />
                    </div>

                    <div>
                        <TextField id="balance" label="Balance" type="number" variant="outlined" placeholder={this.state.balance} value={this.state.balance} onChange={this.onChangeBalance} sx={{ mt: 3, width: "50%" }} disabled />
                        
                        <IconButton aria-label="add-balance" onClick={this.addBalance} sx={{ mt: 3, ml: 3 }}>
                            <AddBoxIcon> Filled </AddBoxIcon>
                        </IconButton>
                        
                        <IconButton aria-label="bad-balance" onClick={this.badBalance} sx={{ mt: 3, ml: 3 }}>
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
                        Update
                    </Button>

                </FormControl>
            </Box>

        );
    };
}

export default Profile;


