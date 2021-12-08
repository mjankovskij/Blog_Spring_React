import React from "react";
import {Form, Button} from 'react-bootstrap';
import Cookies from 'js-cookie';

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
        const name = target.name;

        let item = {...this.state.item};
        item[name] = value;
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
                        console.log(key, json[key]);
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
        return (<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        // minLength="3"
                        // maxLength="20"
                        // required
                        className={this.state.errors.username ? "is-invalid" : Object.keys(this.state.errors).length > 0 ? "is-valid" : ""}
                    />
                    {this.state.errors.username &&
                    <ul className="invalid-feedback">
                        {this.state.errors.username.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="8"
                        required
                        className={this.state.errors.password ? "is-invalid" : Object.keys(this.state.errors).length > 0 ? "is-valid" : ""}
                    />
                    {this.state.errors.password &&
                    <ul className="invalid-feedback">
                        {this.state.errors.password.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                    <Form.Label className="mt-3">Repeat password</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwordRepeat"
                        placeholder="Repeat password"
                        minLength="8"
                        required
                        className={this.state.errors.passwordRepeat ? "is-invalid" : Object.keys(this.state.errors).length > 0 ? "is-valid" : ""}
                    />
                    {this.state.errors.passwordRepeat &&
                    <ul className="invalid-feedback">
                        {this.state.errors.passwordRepeat.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                    <Button type="submit" className="btn btn-primary col-12 mt-3">Register</Button>
                </Form>
        )
    }
}

