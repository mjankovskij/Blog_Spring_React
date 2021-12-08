import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Pencil, Trash} from 'react-bootstrap-icons';
import BlogForm from "./BlogForm";
import Cookies from 'js-cookie';

export default class Blog extends React.Component {
    blog = {
        id: '',
        title: '',
        description: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            blog: this.blog,
            blogs: [],
            dataLoaded: false,
            limit: 5
        }
    }

    loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight - 10) {
            this.setState({
                limit: this.state.limit + 5
            });
            this.componentDidMount();
        }
    }

    componentDidMount() {
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

    dateTimeFormat(dateTime) {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 19)
    }

    edit(blog){
        this.setState({
            blog: blog
        });
        window.scrollTo(0, 0);
    }

    async remove(id) {
        if (window.confirm("Delete the blog?")) {
            await fetch(`/api/blog/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
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
                {this.props.user.username && this.props.user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0] &&
                <BlogForm user={this.props.user} blog={this.state.blog}/>}
                {
                    blogs.map((blog) => (
                        <Card className="mt-4" key={blog.id}>
                            <Card.Header>
                                <h3>{blog.title}</h3>
                                Author: {blog.user.username}<br/>
                                {this.dateTimeFormat(blog.datetime)}
                                {this.props.user.username && this.props.user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0] &&
                                <>
                                    <Button className="ms-2 btn-danger"
                                            onClick={() => this.remove(blog.id)}><Trash/></Button>
                                    <Button className="ms-2 btn-primary"
                                            onClick={() => this.edit(blog)}><Pencil/></Button>
                                </>
                                }
                            </Card.Header>
                            <div className="card-text p-3 text-justify">{blog.description}</div>
                        </Card>
                    ))
                }
            </main>
        )
    }
}

