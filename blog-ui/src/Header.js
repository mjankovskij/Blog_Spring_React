import React from 'react';
import ReactBootstrap, {Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import { LockFill } from 'react-bootstrap-icons';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAuth: false,
            showLoginForm: true,
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
        return (<header className="position-fixed col-12 top-0">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container className="position-relative">
                        <Navbar.Brand href="/">Blog</Navbar.Brand>
                        <Nav className="d-inline-block text-end">
                            <Nav.Item onClick={() => this.authShowHideEvent()}
                                      className="d-inline-block"
                                      href="#auth">
                                <LockFill/>

                            </Nav.Item>
                        </Nav>
                {this.state.displayAuth === true && (
                    <div
                        className="auth-box bg-white col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6 position-absolute end-0 p-2">
                        {this.state.showLoginForm === true ? (<div>
                            <Form>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"/>
                            <Form.Label className="mt-3">Password</Form.Label>
                            <Form.Control type="text" placeholder="Password"/>
                            <Button type="submit" className="btn btn-primary col-12 mt-3">Login</Button>
                            </Form>
                            <p className="mt-2 mb-2">Already have an account?</p>
                            <Button className="btn btn-secondary col-12"
                                    onClick={() => this.changeFormEvent()}>Register</Button>
                        </div>) : (<div>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"/>
                            <Form.Label className="mt-3">Password</Form.Label>
                            <Form.Control type="text" placeholder="Password"/>
                            <Form.Label className="mt-3">Repeat password</Form.Label>
                            <Form.Control type="text" placeholder="Repeat password"/>
                            <Button type="submit" className="btn btn-primary col-12 mt-3">Register</Button>
                            <p className="mt-2 mb-2">Don't have an account?</p>
                            <Button className="btn btn-secondary col-12"
                                    onClick={() => this.changeFormEvent()}>Login</Button>
                        </div>)
                        }
                    </div>)
                }
                    </Container>
                </Navbar>{this.state.displayAuth === true && (
                <div onClick={() => this.authShowHideEvent()} className="dark-screen position-fixed top-0 start-0 w-100 h-100"/>)}
            </header>
        )
    }
}

