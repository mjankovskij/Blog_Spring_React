import React, {useEffect, useState} from 'react';
import {Box, FormControl, Button, TextField} from '@mui/material';
import {saveBlog} from "../../api/blogApi";
import {useTranslation} from "react-i18next";

export default (props) => {
    const {t} = useTranslation();

    const [blog, setBlog] = useState(props.blog);
    const [errors, setErrors] = useState([]);
    const [created, setCreated] = useState(false);

    const handleReset = () => {
        props.handleInputBlog();
        setErrors([]);
    }

    const handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let input = blog;
        input[id] = value;
        props.handleInputBlog(input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsNew = [];
        saveBlog(blog)
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
        setBlog(props.blog);
    }, [props.blog])

    return (
        <Box onChange={handleInput}
             sx={{
                 mt: 2,
                 p: 2,
                 borderRadius: 1,
                 border: "solid 1px #d5d5d5",
                 backgroundColor: '#fcfcfc'
             }}
        >
            {blog.id ?
                <>
                    <h3 style={{display: 'inline'}}>{t("Edit blog")}</h3>
                    <span style={{color: '#999999', marginLeft: '10px'}}>
                            #{blog.id}</span>
                </>
                :
                <h3>{t("Create blog")}</h3>
            }
            <FormControl fullWidth>
                <TextField
                    id="title"
                    label={t("Title")}
                    variant="outlined"
                    sx={{mt: 1.5, backgroundColor: '#fff'}}
                    fullWidth
                    value={blog.title}
                    error={!!errors.title}
                />
                {errors.title &&
                <ul className="invalid-helper">
                    {errors.title.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    id="description"
                    label={t("Description")}
                    variant="outlined"
                    multiline
                    minRows={3}
                    maxRows={15}
                    sx={{mt: 1.5, backgroundColor: '#fff'}}
                    fullWidth
                    value={blog.description}
                    error={!!errors.description}
                />
                {errors.description &&
                <ul className="invalid-helper">
                    {errors.description.map((err, i) => <li key={i}>{err}</li>)}
                </ul>}
            </FormControl>
            {created &&
            <div className="success-response">
                {t("Saved successfully.")}
            </div>}
            <Button type="submit"
                    variant="contained"
                    sx={{mt: 1.5}}
                    onClick={handleSubmit}
            >
                {blog.id ? t("Update") : t("Create")}
            </Button>
            {!props.updateCancel && (props.blog.id || props.blog.title || props.blog.description) &&
            <Button type="submit"
                    variant="contained"
                    sx={{mt: 1.5, ml: 2}}
                    color="inherit"
                    onClick={handleReset}
            >
                {t("Reset")}
            </Button>
            }
            {props.updateCancel &&
            <Button type="submit"
                    variant="contained"
                    color="warning"
                    sx={{mt: 1.5, ml: 2}}
                    onClick={props.updateCancel}
            >
                {t("Cancel")}
            </Button>
            }
        </Box>
    )
}