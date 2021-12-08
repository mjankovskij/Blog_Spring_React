import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Cookies from "js-cookie";

export default class BlogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: this.props.blog,
            errors: {},
            created: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.blog !== props.blog) {
            return {
                blog: props.blog
            }
        }
        return null;
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        let blog = this.state.blog;
        blog[name] = value;
        this.setState({blog: blog});
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.state.errors = {};
        const {blog} = this.state;
        await fetch('/api/blog/save', {
            method: this.state.blog.id ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify(blog),
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
                    errors: {"": ""},
                    created: true
                });
                setTimeout(() => window.location.reload(), 500);
            }
        });
    }

    render() {
        return (<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    // minLength="5"
                    maxLength="100"
                    required
                    defaultValue={this.state.blog.title}
                    className={this.state.errors.title ? "is-invalid" : Object.keys(this.state.errors).length > 0 ? "is-valid" : ""}
                />
                {this.state.errors.title &&
                <ul className="invalid-feedback login">
                    {this.state.errors.title.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}
                <Form.Label className="mt-3">Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Description"
                    // minLength="50"
                    required
                    defaultValue={this.state.blog.description}
                    className={this.state.errors.description ? "is-invalid" : Object.keys(this.state.errors).length > 0 ? "is-valid" : ""}
                />
                {this.state.errors.description &&
                <ul className="invalid-feedback login">
                    {this.state.errors.description.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}
                {this.state.created &&
                <div className="alert alert-success p-1 mt-3 success-response">
                    Blog saved successfully.
                </div>}
                <Button type="submit" className="btn btn-primary col-12 mt-3">Save</Button>
            </Form>
        )
    }
}

