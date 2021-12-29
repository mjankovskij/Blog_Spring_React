import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, CircularProgress, Container} from '@mui/material';
import {deleteBlog, getBlog} from "../api/blogApi";
import Dialog from "../components/blog/Dialog";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import BlogCard from "../components/blog/Card";

export default () => {
    const {t} = useTranslation();
    const emptyBlog = {
        id: useParams().id,
        title: '',
        description: ''
    };

    const user = JSON.parse(sessionStorage.getItem('Authorization'));
    const [tempBlog, setTempBlog] = useState(emptyBlog);
    const [blog, setBlog] = useState(null);
    const [update, setUpdate] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);

    useEffect(() => {
        getBlog(emptyBlog.id)
            .then(({data}) => setBlog(data))
            .catch(() => document.location.href = "/")
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

    const handleInputBlog = (data = tempBlog) => {
        setTempBlog(data);
    }

    const updateCancel = () => {
        setUpdate(false);
    }

    const messageDelete = `${t("Delete blog")} "${removable && removable.title}"?`;

    const handleBlogId = (id) => {
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
                            (
                                user
                                && user["roles"].map(r => r === "ROLE_ADMIN" || r === "ADMIN")[0]
                                &&
                                <BlogForm blog={{...tempBlog}} handleInputBlog={handleInputBlog}
                                          updateCancel={updateCancel}/>
                            )
                            :
                            <BlogCard
                                blog={blog}
                                blogId={blogId}
                                key={blog.id}
                                single={true}
                                editHandle={editHandle}
                                deleteHandle={handleConfirm}
                                handleBlogId={handleBlogId}
                            />
                        }
                    </>
            }
        </Container>
    )
}

