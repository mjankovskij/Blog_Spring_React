import React, {useState} from "react";
import {Button,} from "@mui/material";
import Actions from "./Actions";
import CommentForm from "../forms/Comment";
import {useTranslation} from "react-i18next";
import {deleteComment} from "../../api/commentApi";
import {useSelector} from "react-redux";

export default (props) => {
    const {t} = useTranslation();

    const emptyComment = {
        id: '',
        text: ''
    };

    const [blog, setBlog] = useState(props.blog);
    const [comment, setComment] = useState(emptyComment);
    const user = useSelector(state => state.user.user);

    const handleCommentStart = (blogId) => {
        props.handleBlogIdHandle(blogId);
        setComment(emptyComment);
    }
    const handleEditComment = (blogId, comment) => {
        props.handleBlogIdHandle(blogId);
        setComment(comment);
    }

    const handleDeleteComment = (id) => {
        deleteComment(id).then(() => {
            blog.comments = [...blog.comments].filter(c => c.id !== id);
            setBlog({...blog});
        });
    }

    const handleInputComment = (data = emptyComment) => {
        setComment(data);
    }

    return (
        <div className="card-footer">
            {blog.comments.map((c) => (
                <div className="comment" key={c.id}>
                    <p>{c.user.username}</p>
                    <span>{c.text}</span>
                    {

                            user &&
                            (user['id'] === c.user.id
                            || user["roles"].map(r => r === "ROLE_ADMIN" || r === "ADMIN")
                        )
                        &&
                        <Actions
                            id={c.id}
                            blogId={blog.id}
                            isAuthor={user.id === c.user.id}
                            comment={c}
                            handleEditComment={handleEditComment}
                            handleDeleteComment={handleDeleteComment}
                        />
                    }
                </div>
            ))}
            {user &&
            (
                props.blogId === blog.id ?
                    <CommentForm
                        comment={{...comment}}
                        blogId={blog.id}
                        handleInputComment={handleInputComment}
                    />
                    :
                    <Button
                        sx={{mt: 1, pt: 5}}
                        style={{maxHeight: '40px', minHeight: '40px'}}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        onClick={() => handleCommentStart(blog.id)}
                    >
                        {t("To Comment")}
                    </Button>
            )
            }
        </div>)
}