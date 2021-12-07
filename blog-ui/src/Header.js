import React from 'react';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {LockFill, BoxArrowInRight} from 'react-bootstrap-icons';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAuth: false,
            showLoginForm: true,
            user: ''
        }
    }

    async componentDidMount() {
        await fetch('/user/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(json => {
                    console.log(json)
                    this.setState({
                        user: json
                    });
                });
            }
        });
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
        return (<header className="position-fixed col-12 top-0">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container className="position-relative">
                        <Navbar.Brand href="/">Blog</Navbar.Brand>
                        <Nav className="d-inline-block text-end">
                            {this.state.user.username ?
                                <Nav.Item
                                    className="d-inline-block"
                                    href="#auth">
                                    Sveiki, {this.state.user.username}
                                    <Logout/>
                                </Nav.Item>
                                :
                                <Nav.Item onClick={() => this.authShowHideEvent()}
                                      className="d-inline-block"
                                      href="#auth">
                                <LockFill/>
                            </Nav.Item>}
                        </Nav>
                        {this.state.displayAuth === true && (
                            <div
                                className="auth-box bg-white col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6 position-absolute end-0 p-2">
                                {this.state.showLoginForm === true ? (<>
                                        <Login/>
                                        <p className="mt-2 mb-2">Already have an account?</p>
                                        <Button className="btn btn-secondary col-12"
                                                onClick={() => this.changeFormEvent()}>Register</Button>
                                    </>) : (<>
                                    <Register/>
                                    <p className="mt-2 mb-2">Don't have an account?</p>
                                    <Button className="btn btn-secondary col-12"
                                            onClick={() => this.changeFormEvent()}>Login</Button>
                                </>)
                                }
                            </div>)
                        }
                    </Container>
                </Navbar>{this.state.displayAuth === true && (
                <div onClick={() => this.authShowHideEvent()}
                     className="dark-screen position-fixed top-0 start-0 w-100 h-100"/>)}
            </header>
        )
    }
}

