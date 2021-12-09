import React from 'react';
import Cookies from "js-cookie";
import {Box, FormControl, Button, TextField, ThemeProvider, createTheme} from '@mui/material';

export default class BlogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: this.props.blog,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
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
        const id = target.id;

        let blog = this.state.blog;
        blog[id] = value;
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
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleReset(){
        this.props.handleReset();
        this.setState({errors: {}});
    }

    render() {
        return (
            <Box onChange={this.handleChange}
                 sx={{
                     mt: 2,
                     p: 2,
                     borderRadius: 1,
                     border: "solid 1px #d5d5d5",
                     backgroundColor: '#fcfcfc'
                 }}
            >
                {this.state.blog.id ?
                    <>
                        <h3 style={{display: 'inline'}}>Update blog</h3>
                        <span style={{color: '#999999', marginLeft: '10px'}}>
                            #{this.state.blog.id}</span>
                    </>
                    :
                    <h3>Create blog</h3>
                }
                <FormControl fullWidth color="colek">
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        sx={{mt: 1.5, backgroundColor: '#fff'}}
                        fullWidth
                        value={this.state.blog.title}
                        error={!!this.state.errors.title}
                    />
                </FormControl>
                {this.state.errors.title &&
                <ul className="invalid-helper">
                    {this.state.errors.title.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}
                <FormControl fullWidth>
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={5}
                        sx={{mt: 1.5, backgroundColor: '#fff'}}
                        fullWidth
                        value={this.state.blog.description}
                        error={!!this.state.errors.description}
                    />
                </FormControl>
                {this.state.errors.description &&
                <ul className="invalid-helper">
                    {this.state.errors.description.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}

                {this.state.created &&
                <div className="alert alert-success p-1 mt-3 success-response">
                    Blog saved successfully.
                </div>}
                <Button type="submit"
                        variant="contained"
                        sx={{mt: 1.5}}
                        onClick={this.handleSubmit}
                >
                    {this.state.blog.id ? "Update" : "Create"}
                </Button>
                <Button type="submit"
                        variant="contained"
                        sx={{mt: 1.5, ml: 2}}
                        color="inherit"
                        onClick={this.handleReset}
                >
                    Reset
                </Button>
            </Box>
        )
    }
}