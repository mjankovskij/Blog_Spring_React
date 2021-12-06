import React from 'react';
import {Form, Button} from 'react-bootstrap';

export default class Login extends React.Component {

    emptyItem = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(this.emptyItem.username)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((e) => {
            console.log(e)
        });
        console.log("AA")
    }


    render() {
        return (<>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={this.handleChange}/>
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" onChange={this.handleChange}/>
                    <Button type="submit" className="btn btn-primary col-12 mt-3">Login</Button>
                </Form>
            </>
        )
    }
}

