import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, Button, Card, CardContent, Typography, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import Dialog from "../components/Dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default () => {
    const itemsPage = 5;
    const emptyBlog = {
        id: '',
        title: '',
        description: ''
    };

    const [blog, setBlog] = useState(emptyBlog);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);

    const dateTimeFormat = (dateTime) => {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 16)
    }

    useEffect(() => {
        getBlogs()
            .then(({data}) => setBlogs(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        getUser().then(({data}) => setUser(data));
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
        if (choice === true) {
            remove();
            setOpen(false);
        } else if (choice === false) {
            setOpen(false);
        } else {
            setRemovable(removableBlog);
            setOpen(true);
        }
    }

    const handleInput = (data = emptyBlog) => {
        setBlog(data);
    }

    const messageDelete = `Delete blog "${removable && removable.title}"?`;

    const [page, setPage] = React.useState(1);
    const handlePage = (event, value) => {
        window.scrollTo(0, 380);
        setPage(value);
    };


    return (
        <Container>
            <Dialog open={open} description={messageDelete} handleConfirm={handleConfirm}/>
            {
                loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress/>
                    </Box> :
                    <>
                        {
                            user.username
                            && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                            && <BlogForm blog={{...blog}} handleInput={handleInput}/>
                        }
                        {blogs.slice((page - 1) * itemsPage, page * itemsPage).map((blog) => (
                            <Card key={blog.id} sx={{mt:3}} >
                                <CardContent className="card-head">
                                    <Typography variant="body2" component={'span'}>
                                    <h3>{blog.title}</h3>
                                        <p>Author: {blog.user.username}<br/>
                                    {dateTimeFormat(blog.datetime)}</p>
                                    {
                                        user.username
                                        && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                                        &&
                                        <>
                                            <Button
                                                sx={{ml:1}}
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => handleConfirm(null, blog)}
                                            >
                                                <DeleteForeverIcon/>
                                            </Button>
                                            <Button
                                                    variant="contained"
                                                    onClick={() => edit(blog)}>
                                                <EditIcon/>
                                            </Button>
                                        </>
                                    }
                                    </Typography>
                                </CardContent>
                                <div className="card-text">{blog.description}</div>
                            </Card>
                        ))}
                    </>
            }
            <Pagination
                sx={{display: 'flex', justifyContent: 'center', mt:3}}
                count={Math.ceil(blogs.length/itemsPage)}
                page={page}
                onChange={handlePage}
            />
        </Container>
    )
}

