import React, { useCallback, useState } from 'react';
import ReactBootstrap, {Navbar, Nav, Container, Form, Button} from 'react-bootstrap';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            dataLoaded: false,
            limit: 5
        }
    }

    loadMore = () =>{
        if (window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight-10) {
            this.setState({
                limit: this.state.limit + 5
            });
            this.componentWillMount();
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.loadMore);
        fetch(
            "/api/blog/get")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    blogs: json.slice(0, this.state.limit),
                    dataLoaded: true
                });
            })
    }

    async remove(id) {
        if (window.confirm("Delete the blog?")) {
            await fetch(`/api/blog/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let blogs = [...this.state.blogs].filter(i => i.id !== id);
                this.setState({blogs: blogs});
            });
        }
    }

    render() {
        const {dataLoaded, blogs} = this.state;
        if (!dataLoaded) return <></>;
        return (<main className="container">
                {
                    blogs.map((blog) => (
                        <div className="card mt-4" key={blog.id}>
                            <Button size="sm" color="danger" onClick={() => this.remove(blog.id)}>Delete</Button>
                            <div className="card-header">
                                <h3>{blog.title}</h3>
                                Author: {blog.user.username}<br/>
                                {new Date(blog.datetime).toISOString().slice(0, 10)} {new Date(blog.datetime).toISOString().slice(11, 19)}
                            </div>
                            <div className="card-text p-3 text-justify">{blog.description}</div>
                        </div>
                    ))
                }
            </main>
        )
    }
}

