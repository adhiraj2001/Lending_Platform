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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

            errors: {}
        };
    }

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

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

    
        axios
            .post("http://localhost:4000/users/login", userData)
            .then(res => {
                console.log(res.data);

                ls.set("login", "true");

                ls.set("name", res.data.name);
                ls.set("email", res.data.email);
                ls.set("password", res.data.password);
                ls.set("contact_no", res.data.contact_no);
                ls.set("age", res.data.age);
                ls.set("balance", res.data.balance);

                alert("User Logged In Successfully");
                
                this.reset();
                window.location = "/";
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response.data);
                alert(err.response.data[Object.keys(err.response.data)[0]]);
            });
    };

    reset = e => {
        this.setState({
            email: "",
            password: ""
        });
    };
    
    render() {

        const errors = this.state.errors;

        return (

            <Box container sx={{ marginTop: 8, marginLeft: 'auto', marginRight: 'auto', width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff9c4' }}>

                <Typography component="h1" variant="h3">
                    Login
                </Typography>

                <FormControl onSubmit={this.onSubmit} sx={{ m: 5, minWidth: 120 }}>
                        
                    <div>
                        <TextField id="email" label="Email" type="email" variant="outlined" value={this.state.email} onChange={this.onChangeEmail} sx={{ mt: 3 }} required />
                    </div>

                    <div>
                        <TextField id="password" label="Password" type="password" variant="outlined" value={this.state.password} onChange={this.onChangePassword} sx={{ mt: 3 }} required />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={this.onSubmit}
                    >
                        Sign In
                    </Button>

                </FormControl>
            </Box>
        );
    }
}

export default Login;


