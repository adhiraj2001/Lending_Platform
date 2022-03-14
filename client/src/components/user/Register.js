import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class Register extends Component {

    constructor(props) {
        super(props);
        
		this.state = {
            name: "",
            email: "",
            password: "",
            contact_no: 0,
            age: 0,
            
            errors: {}
		};
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
            age: this.state.age
        };

        console.log(newUser);

        axios.post("http://localhost:4000/users/register", newUser)
            .then(res => {
                alert("User Registered Successfully");
                this.reset();
                // window.location.reload();
                window.location = "/login";
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response.data);
                console.log(err.response.data.age)
                alert(err.response.data[Object.keys(err.response.data)[0]]);
            });
    };

    reset = e => {
        this.setState({
            name: "",
            email: "",
            password: "",
            contact_no: 0,
            age: 0
        });
    }
     
    render = () => {

        // const { errors } = this.state;
        // const { user_option } = this.state;

        return (
            
            <Box container sx={{ marginTop: 8, marginLeft: 'auto', marginRight: 'auto', width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff9c4' }}>

                <Typography component="h1" variant="h3">
                    Register
                </Typography>

                <FormControl onSubmit={this.onSubmit} sx={{ m: 5, minWidth: 120 }}>

                    <div>
                        <TextField id="name" label="Name" type="text" variant="outlined" value={this.state.name} onChange={this.onChangeName} sx={{ mt: 3 }} required />
                    </div>
                    
                    <div>
                        <TextField id="email" label="Email" type="email" variant="outlined" value={this.state.email} onChange={this.onChangeEmail} sx={{ mt: 3 }} required />
                    </div>

                    <div>
                        <TextField id="password" label="Password" type="password" variant="outlined" value={this.state.password} onChange={this.onChangePassword} sx={{ mt: 3 }} required />
                    </div>

                    <div>
                        <TextField id="contact_no" label="Contact No." type="number" variant="outlined" value={this.state.contact_no} onChange={this.onChangeContact_no} sx={{ mt: 3 }} required />
                    </div>

                    <div>
                        <TextField id="age" label="Age" type="number" variant="outlined" value={this.state.age} onChange={this.onChangeAge} sx={{ mt: 3 }} required />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={this.onSubmit}
                    >
                        Sign Up
                    </Button>

                </FormControl>
            </Box>

        );
    };
}

export default Register;


