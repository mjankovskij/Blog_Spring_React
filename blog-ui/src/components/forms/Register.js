import React, {useState} from "react";
import {Box, FormControl, Button, TextField} from '@mui/material';
import {registerProcess} from "../../api/userApi";

export default () => {
    const emptyUser = {
        username: '',
        password: '',
        passwordRepeat: ''
    };

    const [user, setUser] = useState(emptyUser);
    const [errors, setErrors] = useState([]);


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let input = emptyUser;
        input[id] = value;
        setUser(input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsNew = [];
        registerProcess(user)
            .then(() => {
                    window.location.reload();
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

        return (<Box onChange={handleChange}>
                <h3>Create an account</h3>
                <FormControl fullWidth>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        size="small"
                        sx={{mt: 0.5}}
                        error={!!errors.username}
                        fullWidth
                    />
                    {errors.username &&
                    <ul className="invalid-helper">
                        {errors.username.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        sx={{mt: 1.5}}
                        error={!!errors.password}
                        fullWidth
                    />
                    {errors.password &&
                    <ul className="invalid-helper">
                        {errors.password.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="passwordRepeat"
                        label="Repeat password"
                        variant="outlined"
                        size="small"
                        sx={{mt: 1.5}}
                        error={!!errors.passwordRepeat}
                        fullWidth
                    />
                    {errors.passwordRepeat &&
                    <ul className="invalid-helper">
                        {errors.passwordRepeat.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>}
                </FormControl>
                <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 1.5, mb: 1}}
                        fullWidth
                        onClick={handleSubmit}
                >
                    Register
                </Button>
            </Box>
        )
}

