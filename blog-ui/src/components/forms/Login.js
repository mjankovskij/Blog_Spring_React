import React, {useState} from 'react';
import {Box, FormControl, Button, TextField} from '@mui/material';
import {loginProcess} from "../../api/userApi";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation();
    const emptyUser = {
        username: '',
        password: ''
    };

    const [user, setUser] = useState(emptyUser);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        let input = user;
        input[id] = value;
        setUser(input);
    }

    const handleSubmit = (e) => {
        const errorsNew = [];
        e.preventDefault();
        loginProcess(user)
            .then(({data, headers}) => {
                data["token"] = headers.authorization;
                sessionStorage.setItem('Authorization', JSON.stringify(data));
                window.location.href = "/";
            })
            .catch(() => {
                    errorsNew["password"] = [t("Bad Credentials")];
                    setErrors(errorsNew);
                }
            );
    }

    return (<Box onChange={handleChange}>
            <h3>{t("Sign in")}</h3>
            <FormControl fullWidth>
                <TextField
                    id="username"
                    label={t("Username")}
                    variant="outlined"
                    size="small"
                    sx={{mt: 0.5}}
                    fullWidth
                    error={!!errors.password}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    id="password"
                    label={t("Password")}
                    variant="outlined"
                    type="password"
                    size="small"
                    sx={{mt: 1.5}}
                    fullWidth
                    error={!!errors.password}
                />
                {errors.password &&
                <ul className="invalid-helper">
                    {errors.password.map((err, i) => <li key={i}>{t(err)}</li>)}
                </ul>}
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                sx={{mt: 1.5, mb: 1}}
                fullWidth
                onClick={handleSubmit}
            >
                {t("Login")}
            </Button>
        </Box>
    )
}

