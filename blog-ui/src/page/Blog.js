import React, {useEffect, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Pencil, Trash} from 'react-bootstrap-icons';
import BlogForm from "../components/forms/Blog";
import {Box, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import Dialog from "../components/Dialog";

export default () => {
    const emptyBlog = {
        id: '',
        title: '',
        description: ''
    };

    const [blog, setBlog] = useState(emptyBlog);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(getUser());
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);

    const dateTimeFormat = (dateTime) => {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 16)
    }

    useEffect(() => {
        getBlogs()
            .then(({data}) => setBlogs(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    const edit = (blog) => {
        setBlog(blog);
        window.scrollTo(0, 0);
    }

    const remove = () => {
            deleteBlog(removable.id).then(() => {
                let blogsCleaned = [...blogs].filter(i => i.id !== removable.id);
                setBlogs(blogsCleaned);
            });
    }

    const handleConfirm = (choice, removableBlog) => {
        if(choice === true){
            remove();
            setOpen(false);
        } else
        if(choice === false){
            setOpen(false);
        } else{
            setRemovable(removableBlog);
            setOpen(true);
        }
    }

    const handleChange = (data = emptyBlog) => {
        setBlog(data);
    }

    const messageDelete = `Delete blog "${removable && removable.title}"?`;

    return (
        <Container>
            <Dialog open={open} description={messageDelete} handleConfirm={handleConfirm}/>
            {
                loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress/>
                    </Box> :
                    <>
                        <BlogForm blog={{...blog}} handleChange={handleChange}/>
                        {blogs.map((blog) => (
                            <Card className="mt-4" key={blog.id}>
                                <Card.Header id={blog.id}>
                                    <h3>{blog.title}</h3>
                                    Author: {blog.user.username}<br/>
                                    {dateTimeFormat(blog.datetime)}
                                    {/*{this.props.user.username && this.props.user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0] &&*/}
                                    {/*<>*/}
                                    <Button className="ms-2 btn-danger"
                                            onClick={() => handleConfirm(null, blog)}><Trash/></Button>
                                    <Button className="ms-2 btn-primary"
                                            onClick={() => edit(blog)}><Pencil/></Button>
                                    {/*</>*/}
                                    {/*}*/}
                                </Card.Header>
                                <div className="card-text p-3 text-justify">{blog.description}</div>
                            </Card>
                        ))}
                    </>
            }
            <Pagination count={3}/>
        </Container>
    )
}

