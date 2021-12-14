import React, {useEffect, useState} from 'react';
import {Box, FormControl, Button, TextField} from '@mui/material';
import {saveBlog} from "../../api/blogApi";

export default (props) => {
    const [blog, setBlog] = useState(props.blog);
    const [errors, setErrors] = useState([]);
    const [created, setCreated] = useState(false);

    const handleReset = () => {
        props.handleInput();
        setErrors([]);
    }

    const handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let input = blog;
        input[id] = value;
        props.handleInput(input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsNew = [];
        saveBlog(blog)
            .then(r => {
                    setErrors([])
                    setCreated(true);
                    setTimeout(() => window.location.reload(), 500);
                }
            )
            .catch(error => {
                    for (let key of Object.keys(error.response.data)) {
                        errorsNew[key] = error.response.data[key];
                    }
                    setErrors(errorsNew);
                }
            );
    }

    useEffect(() => {
        setBlog(props.blog)
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
                    <h3 style={{display: 'inline'}}>Update blog</h3>
                    <span style={{color: '#999999', marginLeft: '10px'}}>
                            #{blog.id}</span>
                </>
                :
                <h3>Create blog</h3>
            }
            <FormControl fullWidth color="colek">
                <TextField
                    id="title"
                    label="Title"
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
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={5}
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
            <div className="alert alert-success p-1 mt-3 success-response">
                Blog saved successfully.
            </div>}
            <Button type="submit"
                    variant="contained"
                    sx={{mt: 1.5}}
                    onClick={handleSubmit}
            >
                {blog.id ? "Update" : "Create"}
            </Button>
            <Button type="submit"
                    variant="contained"
                    sx={{mt: 1.5, ml: 2}}
                    color="inherit"
                    onClick={handleReset}
            >
                Reset
            </Button>
        </Box>
    )
}