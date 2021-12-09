import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {LockFill} from 'react-bootstrap-icons';
import Login from './user/Login';
import Register from './user/Register';
import Logout from './user/Logout';
import {
    Card,
    Link,
    Button,
    Box,
    AppBar,
    Toolbar,
    Typography,
    createTheme,
    ThemeProvider,
    IconButton, Grid, Paper
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import {styled} from '@mui/material/styles';
import {green} from '@mui/material/colors';

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

    authShowHideEvent() {
        this.setState({
            displayAuth: !this.state.displayAuth,
        });
    }

    changeFormEvent() {
        this.setState({
            showLoginForm: !this.state.showLoginForm,
        });
    }

    render() {
        return (<Box sx={{flexGrow: 1}}>
                {this.state.displayAuth === true && (
                    <div onClick={() => this.authShowHideEvent()}
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
                                <Link color="white" href="/" underline="none" hover>
                                    BLOG
                                </Link>
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>
                            <Box>
                                <Logout/>
                                    {this.props.user.username ?
                                    <AccountCircleIcon/>:
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => this.authShowHideEvent()}
                                        ><LoginIcon/>

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
                                    <Button sx={{ml:0.5}} onClick={() => this.changeFormEvent()}>Register</Button>
                                </>) : (<>
                                    <Register/>
                                    <span>Already have an account?</span>
                                    <Button sx={{ml:0.5}} onClick={() => this.changeFormEvent()}>Login</Button>
                                </>)
                                }
                        </Grid>
                )}
            </Box>
        )
        //
        // return (<header className="position-fixed col-12 top-0">
        //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        //             <Container className="position-relative">
        //                 <Navbar.Brand href="/">Blog</Navbar.Brand>
        //                 <Nav className="d-inline-block text-end">
        //                     {this.props.user.username ?
        //                         <Nav.Item
        //                             className="d-inline-block"
        //                             href="#auth">
        //                             Sveiki, {this.props.user.username}
        //                             <Logout/>
        //                         </Nav.Item>
        //                         :
        //                         <Nav.Item onClick={() => this.authShowHideEvent()}
        //                               className="d-inline-block"
        //                               href="#auth">
        //                         <LockFill/>
        //                     </Nav.Item>}
        //                 </Nav>
        //                 {this.state.displayAuth === true && (
        //                     <div
        //                         className="auth-box bg-white col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6 position-absolute end-0 p-2">
        //                         {this.state.showLoginForm === true ? (<>
        //                                 <Login/>
        //                                 <span className="mt-2 mb-2">Don't have an account?</span>
        //                                 <Button onClick={() => this.changeFormEvent()}>Register</Button>
        //                             </>) : (<>
        //                             <Register/>
        //                             <span className="mt-2 mb-2">Already have an account?</span>
        //                             <Button onClick={() => this.changeFormEvent()}>Login</Button>
        //                         </>)
        //                         }
        //                     </div>)
        //                 }
        //             </Container>
        //         </Navbar>{this.state.displayAuth === true && (
        //         <div onClick={() => this.authShowHideEvent()}
        //              className="dark-screen position-fixed top-0 start-0 w-100 h-100"/>)}
        //     </header>
        // )
    }
}

