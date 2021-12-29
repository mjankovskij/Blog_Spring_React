import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlogs} from "../api/blogApi";
import Dialog from "../components/blog/Dialog";
import BlogCard from "../components/blog/Card";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation();
    const itemsPage = 5;
    const emptyBlog = {
        id: '',
        title: '',
        description: ''
    };

    const user = JSON.parse(sessionStorage.getItem('Authorization'));
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = React.useState(1);
    const [blogId, setBlogId] = useState(null);
    const [blog, setBlog] = useState(emptyBlog);
    const [removable, setRemovable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getBlogs()
            .then(({data}) => setBlogs(data))
            .finally(() => setLoading(false));
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

    const messageDelete = `${t("Delete blog")} "${removable && removable.title}"?`;

    const handlePage = (event, value) => {
        if (page !== value) {
            window.scrollTo(0, 340);
            setPage(value);
        }
    };

    const removeHandle = () => {
        deleteBlog(removable.id).then(() => {
            const blogsCleaned = [...blogs].filter(i => i.id !== removable.id);
            setBlogs(blogsCleaned);
        });
    }

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
                        {
                            user
                            && user["roles"].map(r => r === "ROLE_ADMIN" || r === "ADMIN")[0]
                            && <BlogForm blog={{...blog}} handleInputBlog={handleInputBlog}/>
                        }
                        {
                            !blogs.length &&
                            <div className="error-response">
                                {t("Blog is empty.")}
                            </div>
                        }
                        {blogs.slice((page - 1) * itemsPage, page * itemsPage).map((blog) => (
                            <BlogCard
                                editHandle={editHandle}
                                blog={blog}
                                deleteHandle={handleConfirm}
                                blogId={blogId}
                                handleBlogId={handleBlogId}
                                key={blog.id}
                            />
                        ))}
                        {blogs.length > itemsPage &&
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

