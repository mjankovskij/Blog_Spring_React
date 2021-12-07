import React from 'react';
import {Form, Button} from 'react-bootstrap';
import Cookies from 'js-cookie';

export default class Login extends React.Component {
    emptyItem = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
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
        const {item} = this.state;
        await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify(item),
        }).then((e) => {
            console.log("resp", e)
        });
    }


    render() {
        return (<>
                <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        minLength="3"
                        maxLength="20"
                        required
                    />
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="8"
                        required
                    />
                    <Button type="submit" className="btn btn-primary col-12 mt-3">Login</Button>
                </Form>
            </>
        )
    }
}

