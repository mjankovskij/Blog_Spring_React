import React, {useEffect, useState} from 'react';
import Login from '../forms/Login';
import Register from '../forms/Register';
import {
    Link,
    Button,
    Box,
    AppBar,
    Toolbar,
    Typography,
    createTheme,
    ThemeProvider,
    IconButton,
    Grid, FormControl, Select, MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Cookies from 'universal-cookie';

export default () => {
    const {t} = useTranslation();
    const cookies = new Cookies();

    const [auth, setAuth] = useState(false);
    const [loginForm, setLoginForm] = useState(true);

    const user = JSON.parse(sessionStorage.getItem('Authorization'));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const handleLogout = () => {
        sessionStorage.removeItem('Authorization');
        window.location.href = '/';
    }

    const changeLanguage = (e) => {
        cookies.set('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE', e.target.value, {path: '/'});
        window.location.reload();
    };

    return (<Box sx={{flexGrow: 1}}>
            {auth && !user && (
                <div onClick={() => {
                    setAuth(!auth)
                }} className="dark-screen"/>)}
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            <Link
                                color="white"
                                underline="none"
                                to="/"
                                component={NavLink}
                            >
                                BLOG
                            </Link>
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Box>
                            <FormControl
                                style={{textUnderlinePosition: 'under'}}
                            >
                                <Select
                                    className="language-select"
                                    id="language"
                                    value={cookies.get('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE')}
                                    onChange={changeLanguage}
                                >
                                    <MenuItem name="language" value="en">EN</MenuItem>
                                    <MenuItem name="language" value="lt">LT</MenuItem>
                                </Select>
                            </FormControl>
                            {user ?
                                <>
                                    <span>{t("Hi")}, {user.username}</span>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ml: 1}}
                                        onClick={handleLogout}
                                    >
                                        <LogoutIcon/>
                                    </IconButton>
                                </>
                                :
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => {
                                        setAuth(!auth)
                                    }}
                                >
                                    <AccountCircleIcon/>
                                </IconButton>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            {auth && !user && (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} position="fixed" className="auth-box">
                    {loginForm ? (<>
                        <Login/>
                        <span>{t("Don't have an account?")}</span>
                        <Button sx={{ml: 0.5}} onClick={() => {
                            setLoginForm(!loginForm)
                        }}>{t("Register")}</Button>
                    </>) : (<>
                        <Register/>
                        <span>{t("Already have an account?")}</span>
                        <Button sx={{ml: 0.5}} onClick={() => {
                            setLoginForm(!loginForm)
                        }}>{t("Login")}</Button>
                    </>)
                    }
                </Grid>
            )}
        </Box>
    )
}

