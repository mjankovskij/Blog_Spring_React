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
    IconButton, Grid
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {getUser, logoutProcess} from "../../api/userApi";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default () => {
    const [auth, setAuth] = useState(false);
    const [loginForm, setLoginForm] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser()
            .then(({data}) => setUser(data))
    }, [])

    const handleLogout = () => {
        logoutProcess().then(() => {
            window.location.reload();
        });
    }

    return (<Box sx={{flexGrow: 1}}>
            {auth && (
                <div onClick={() => {
                    setAuth(!auth)
                }} className="dark-screen position-fixed top-0 start-0 w-100 h-100"/>)}
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {md: 'flex'}}}
                        >
                            <Link color="white" to="/" underline="none"
                                  component={NavLink}>
                                BLOG
                            </Link>
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Box>
                            {user.username ?
                                <>
                                    <span>Hi, {user.username}</span>
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
            {auth && (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} position="fixed" className="auth-box">
                    {loginForm ? (<>
                        <Login/>
                        <span>Don't have an account?</span>
                        <Button sx={{ml: 0.5}} onClick={() => {
                            setLoginForm(!loginForm)
                        }}>Register</Button>
                    </>) : (<>
                        <Register/>
                        <span>Already have an account?</span>
                        <Button sx={{ml: 0.5}} onClick={() => {
                            setLoginForm(!loginForm)
                        }}>Login</Button>
                    </>)
                    }
                </Grid>
            )}
        </Box>
    )
}

