import React from "react";
import Cookies from 'js-cookie';
import {Box, FormControl, Button, TextField} from '@mui/material';

export default class Register extends React.Component {
    emptyItem = {
        username: '',
        password: '',
        passwordRepeat: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let item = {...this.state.item};
        item[id] = value;
        this.setState({item});
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.state.errors = {};
        const {item} = this.state;
        await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            processData: false,
            body: JSON.stringify(item),
        }).then(response => {
            if (!response.ok) {
                response.json().then(json => {
                    for (let key of Object.keys(json)) {
                        this.state.errors[key] = json[key];
                    }
                    this.setState({
                        errors: this.state.errors
                    });
                });
            } else {
                this.setState({
                    errors: {"": ""}
                });
            }
        });
    }

    render() {
        return (<Box onChange={this.handleChange}>
                <h3>Create an account</h3>
                <FormControl fullWidth>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        size="small"
                        sx={{mt: 0.5}}
                        error={!!this.state.errors.username}
                        fullWidth
                    />
                    {this.state.errors.username &&
                    <ul className="invalid-helper">
                        {this.state.errors.username.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        sx={{mt: 1.5}}
                        error={!!this.state.errors.password}
                        fullWidth
                    />
                    {this.state.errors.password &&
                    <ul className="invalid-helper">
                        {this.state.errors.password.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="passwordRepeat"
                        label="Repeat password"
                        variant="outlined"
                        size="small"
                        sx={{mt: 1.5}}
                        error={!!this.state.errors.passwordRepeat}
                        fullWidth
                    />
                    {this.state.errors.passwordRepeat &&
                    <ul className="invalid-helper">
                        {this.state.errors.passwordRepeat.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 1.5, mb: 1}}
                        fullWidth
                        onClick={this.handleSubmit}
                >
                    Register
                </Button>
            </Box>
        )
    }
}

