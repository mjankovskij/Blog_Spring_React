import {Button, Card, CardContent, Typography} from "@mui/material";
import Actions from "./Actions";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Comments from "./Comments";

export default (props) => {
    const {t} = useTranslation();

    const user = JSON.parse(sessionStorage.getItem('Authorization'));

    const [blog, setBlog] = useState(props.blog);

    const dateTimeFormat = (dateTime) => {
        return new Date(new Date(dateTime).getTime() - (new Date(dateTime).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').slice(0, 16)
    }

    const handleEditBlog = (data) => {
        props.editHandle(data);
    }

    const handleDeleteBlog = (data) => {
        props.deleteHandle(null, data);
    }

    return (<Card sx={{mt: 3}}>
        <CardContent className="card-head">
            <Typography variant="body2" component={'span'}>

                {/*
                                <Link
                                    color="white"
                                    underline="none"
                                    to="/"
                                    component={NavLink}
                                >
                                    BLOG
                                </Link>*/}
                <h3>{blog.title}</h3>
                <p>{t("Author")}: {blog.user.username}<br/>
                    {dateTimeFormat(blog.datetime)}</p>
                {
                    user
                    && user["roles"].map(r => r === "ROLE_ADMIN" || r === "ADMIN")[0]
                    &&
                    <div className="actions">
                        <Actions
                            id={blog.id}
                            blog={blog}
                            handleEditBlog={handleEditBlog}
                            handleDeleteBlog={handleDeleteBlog}
                        />
                    </div>
                }
            </Typography>
        </CardContent>
        <div className="card-body">
            <div className="card-text">{blog.description}</div>
        </div>
        <Comments
            blog={blog}
            blogId={props.blogId}
            handleBlogIdHandle={props.handleBlogIdHandle}
        />
    </Card>)
}