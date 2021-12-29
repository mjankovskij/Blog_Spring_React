import React, {useEffect, useState} from 'react';
import {Box, FormControl, Button, TextField} from '@mui/material';
import {useTranslation} from "react-i18next";
import {saveComment} from "../../api/commentApi";
import SendIcon from '@mui/icons-material/Send';

export default (props) => {
    const {t} = useTranslation();

    const [comment, setComment] = useState(props.comment);
    const [errors, setErrors] = useState([]);
    const [created, setCreated] = useState(false);

    const handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let input = comment;
        input[id] = value;
        props.handleInputComment(input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsNew = [];
        saveComment(comment, props.blogId)
            .then(() => {
                    setErrors([])
                    setCreated(true);
                    setTimeout(() => window.location.reload(), 500);
                }
            )
            .catch(error => {
                    if (error.response.status === 401) {
                        sessionStorage.removeItem('Authorization');
                        window.location.href = '/';
                    } else {
                        for (let key of Object.keys(error.response.data)) {
                            errorsNew[key] = error.response.data[key];
                        }
                        setErrors(errorsNew);
                    }
                }
            );
    }

    useEffect(() => {
        setComment(props.comment);
    }, [props.comment])

    return (
        <Box onChange={handleInput}
        >
            {created ?
                <div className="success-response">
                    {t("Saved successfully.")}
                </div>
                :
                <>
                    <FormControl
                        className="comment-field">
                        <TextField
                            id="text"
                            label={t("Comment")}
                            variant="outlined"
                            sx={{mt: 1.5, backgroundColor: '#fff'}}
                            fullWidth
                            value={comment.text}
                            error={!!errors.text}
                        />
                        {errors.text &&
                        <ul className="invalid-helper">
                            {errors.text.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>}
                    </FormControl>
                    <Button type="submit"
                            variant="outlined"
                            sx={{mt: 1.5, ml: 1}}
                            onClick={handleSubmit}
                    >
                        <SendIcon
                            style={{maxHeight: '50px', minHeight: '50px', minWidth: '50px', maxWidth: '50px'}}
                            sx={{p: 2}}
                        />
                    </Button>
                </>
            }
        </Box>
    )
}