import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import {useTranslation} from "react-i18next";
import Dialog from "../components/blog/Dialog";
import BlogCard from "../components/blog/Card";


export default () => {
    const {t} = useTranslation();
    const itemsPage = 5;
    const emptyBlog = {
        id: '',
        title: '',
        description: ''
    };

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState([]);
    const [page, setPage] = React.useState(1);

    const [blogId, setBlogId] = useState(null);
    const [blog, setBlog] = useState(emptyBlog);
    const [removable, setRemovable] = useState(null);

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getBlogs()
            .then(({data}) => setBlogs(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        getUser().then(({data}) => setUser(data));
    }, [])

    const editHandle = (blog) => {
        setBlog(blog);
        window.scrollTo(0, 0);
    }

    const handleConfirm = (choice, removableBlog) => {
        if (choice === true) {
            removeHandle();
            setOpen(false);
        } else if (choice === false) {
            setOpen(false);
        } else {
            setRemovable(removableBlog);
            setOpen(true);
        }
    }

    const handleInputBlog = (data = emptyBlog) => {
        setBlog(data);
    }

    const messageDelete = `Delete blog "${removable && removable.title}"?`;

    const handlePage = (event, value) => {
        if (page !== value) {
            window.scrollTo(0, 380);
            setPage(value);
        }
    };

    const removeHandle = () => {
        deleteBlog(removable.id).then(() => {
            let blogsCleaned = [...blogs].filter(i => i.id !== removable.id);
            setBlogs(blogsCleaned);
        });
    }

    const handleBlogIdHandle = (id) =>{
        setBlogId(id);
    }

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
                            && <BlogForm blog={{...blog}} handleInputBlog={handleInputBlog}/>
                        }
                        {blogs.slice((page - 1) * itemsPage, page * itemsPage).map((blog) => (
                            <BlogCard
                                editHandle={editHandle}
                                blog={blog}
                                deleteHandle={handleConfirm}
                                blogId={blogId}
                                handleBlogIdHandle={handleBlogIdHandle}
                                key={blog.id}
                            />
                        ))}
                        { blogs.length > itemsPage &&
                            <Pagination
                                sx={{display: 'flex', justifyContent: 'center', mt: 3}}
                                count={Math.ceil(blogs.length / itemsPage)}
                                page={page}
                                onChange={handlePage}
                            />
                        }
                    </>
            }
        </Container>
    )
}

