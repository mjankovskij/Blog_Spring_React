import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, Button, Card, CardContent, Typography, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from "react-i18next";
import Actions from "../components/blog/Actions";
import Dialog from "../components/Dialog";
import {deleteComment} from "../api/commentApi";
import Comment from "../components/forms/Comment";


export default () => {
    const {t} = useTranslation();
    const itemsPage = 5;
    const emptyBlog = {
        id: '',
        title: '',
        description: ''
    };

    const emptyComment = {
        id: '',
        text: ''
    };

    const [blog, setBlog] = useState(emptyBlog);
    const [commentId, setCommentId] = useState("3b3df024-d406-45db-badb-7507139a8563");
    const [comment, setComment] = useState(emptyComment);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);
    const [page, setPage] = React.useState(1);

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

    const handleInputComment = (data = emptyComment) => {
        setComment(data);
    }

    const dateTimeFormat = (dateTime) => {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 16)
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

    const handleDeleteComment = (id) => {
        deleteComment(id).then(() => {
            let blogsCleaned = [...blogs];
            blogsCleaned.map(b => {
                b.comments = [...b.comments].filter(c => c.id !== id)
            });
            setBlogs(blogsCleaned);
        });
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
                            <Card key={blog.id} sx={{mt: 3}}>
                                <CardContent className="card-head">
                                    <Typography variant="body2" component={'span'}>
                                        <h3>{blog.title}</h3>
                                        <p>{t("Author")}: {blog.user.username}<br/>
                                            {dateTimeFormat(blog.datetime)}</p>
                                        {
                                            user.username
                                            && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                                            &&
                                            <div className="actions">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => editHandle(blog)}
                                                >
                                                    <EditIcon/>
                                                </Button>
                                                <Button
                                                    sx={{ml: 1}}
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => handleConfirm(null, blog)}
                                                >
                                                    <DeleteForeverIcon/>
                                                </Button>
                                            </div>
                                        }
                                    </Typography>
                                </CardContent>
                                <div className="card-body">
                                    <div className="card-text">{blog.description}</div>
                                </div>
                                <div className="card-footer">
                                    {blog.comments.map((comment) => (
                                        <div className="comment" key={comment.id}>
                                            <p>{comment.user.username}</p>
                                            <span>{comment.text}</span>
                                            <Actions id={comment.id} handleDeleteComment={handleDeleteComment}/>
                                        </div>
                                    ))}
                                    {commentId === blog.id ?
                                    <Comment comment={{...comment}} blogId={blog.id} handleInputComment={handleInputComment}/>
                                        :
                                        <Button
                                            sx={{mt:1, pt: 5}}
                                            style={{maxHeight: '40px', minHeight: '40px'}}
                                            fullWidth
                                            color="primary"
                                            variant="outlined"
                                            onClick={()=>setCommentId(blog.id)}>comment</Button>
                                    }
                                </div>
                            </Card>
                        ))}
                        <Pagination
                            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
                            count={Math.ceil(blogs.length / itemsPage)}
                            page={page}
                            onChange={handlePage}
                        />
                    </>
            }
        </Container>
    )
}

