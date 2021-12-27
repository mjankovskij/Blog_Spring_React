import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, Button, Card, CardContent, Typography, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import Dialog from "../components/blog/Dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import BlogCard from "../components/blog/Card";
import {useSelector} from "react-redux";

export default ({match}) => {
    const {t} = useTranslation();
    const emptyBlog = {
        id: useParams().id,
        title: '',
        description: ''
    };

    const [tempBlog, setTempBlog] = useState(emptyBlog);
    const [blog, setBlog] = useState(null);
    const [update, setUpdate] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);

    useEffect(() => {
        getBlog(emptyBlog.id)
            .then(({data}) => setBlog(data))
            .catch(error => document.location.href = "/")
            .finally(() => setLoading(false));
    }, [])

    const editHandle = (data) => {
        setTempBlog(data);
        setUpdate(true);
        window.scrollTo(0, 0);
    }

    const removeHandle = () => {
        deleteBlog(removable.id).then(() => {
            document.location.href = "/";
        });
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

    const handleInput = (data = emptyBlog) => {
        setTempBlog(data);
    }

    const updateCancel = () => {
        setUpdate(false);
    }

    const messageDelete = `Delete blog "${removable && removable.title}"?`;

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
                        {update ?
                            (user.username
                                && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                                &&
                                <BlogForm blog={{...tempBlog}} handleInput={handleInput} updateCancel={updateCancel}/>)
                            :
                            <BlogCard
                                editHandle={editHandle}
                                blog={blog}
                                deleteHandle={handleConfirm}
                                blogId={blogId}
                                handleBlogIdHandle={handleBlogIdHandle}
                                key={blog.id}
                            />
                        }
                    </>
            }
        </Container>
    )
}

