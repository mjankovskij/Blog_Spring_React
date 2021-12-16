import React, {useEffect, useState} from 'react';
import BlogForm from "../components/forms/Blog";
import {Box, Button, Card, CardContent, Typography, CircularProgress, Container, Pagination} from '@mui/material';
import {deleteBlog, getBlog, getBlogs} from "../api/blogApi";
import {getUser} from "../api/userApi";
import Dialog from "../components/Dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export default ({match}) => {
    const {t} = useTranslation();
    const emptyBlog = {
        id: useParams().id,
        title: '',
        description: ''
    };

    const [blog, setBlog] = useState(emptyBlog);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [removable, setRemovable] = useState(null);

    useEffect(() => {
        getBlog(emptyBlog.id)
            .then(({data}) => setData(data))
            .catch(error => document.location.href = "/")
            .finally(() => setLoading(false));
        getUser().then(({data}) => setUser(data));
    }, [])

    const editHandle = (dt) => {
        setBlog(dt);
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
        setBlog(data);
    }

    const updateCancel = () => {
        setUpdate(false);
    }

    const dateTimeFormat = (dateTime) => {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 16)
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
                        {update ?
                            (user.username
                                && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                                &&
                                <BlogForm blog={{...blog}} handleInput={handleInput} updateCancel={updateCancel}/>)
                            :
                            <Card key={data.id} sx={{mt: 3}}>
                                <CardContent className="card-head">
                                    <Typography variant="body2" component={'span'}>
                                        <h3>{data.title}</h3>
                                        <p>{t("Author")}: {data.user.username}<br/>
                                            {dateTimeFormat(data.datetime)}</p>
                                        {
                                            user.username
                                            && user["roles"].map(e => e.name === "ROLE_ADMIN" || e.name === "ADMIN")[0]
                                            &&
                                            <div className="actions">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => editHandle(data)}>
                                                    <EditIcon/>
                                                </Button>
                                                <Button
                                                    sx={{ml: 1}}
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => handleConfirm(null, data)}
                                                >
                                                    <DeleteForeverIcon/>
                                                </Button>
                                            </div>
                                        }
                                    </Typography>
                                </CardContent>
                                <div className="card-body">
                                    <div className="card-text-full">{data.description}</div>
                                </div>
                            </Card>
                        }
                    </>
            }
        </Container>
    )
}

