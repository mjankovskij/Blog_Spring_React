import React from 'react';
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
import LoginIcon from '@mui/icons-material/Login';
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAuth: false,
            showLoginForm: true
        }
    }

    async handleLogout() {
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            redirect: 'manual'
        }).then(() => {
            window.location.reload();
        });
    }

    authBoxHandle() {
        this.setState({
            displayAuth: !this.state.displayAuth,
        });
    }

    authSwitchHandle() {
        this.setState({
            showLoginForm: !this.state.showLoginForm,
        });
    }

    render() {
        return (<Box sx={{flexGrow: 1}}>
                {this.state.displayAuth === true && (
                    <div onClick={() => this.authBoxHandle()}
                         className="dark-screen position-fixed top-0 start-0 w-100 h-100"/>)}
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
                                {this.props.user.username ?
                                    <>
                                        <span>Hi, {this.props.user.username}</span>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="inherit"
                                            sx={{ml:1}}
                                            onClick={() => this.handleLogout()}
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
                                        onClick={() => this.authBoxHandle()}
                                    >
                                        <AccountCircleIcon/>
                                    </IconButton>
                                }
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                {this.state.displayAuth === true && (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} position="fixed" className="auth-box">
                        {this.state.showLoginForm === true ? (<>
                            <Login/>
                            <span>Don't have an account?</span>
                            <Button sx={{ml: 0.5}} onClick={() => this.authSwitchHandle()}>Register</Button>
                        </>) : (<>
                            <Register/>
                            <span>Already have an account?</span>
                            <Button sx={{ml: 0.5}} onClick={() => this.authSwitchHandle()}>Login</Button>
                        </>)
                        }
                    </Grid>
                )}
            </Box>
        )
    }
}

