import React from 'react';
import ReactBootstrap, {Navbar, Nav, Container, Form} from 'react-bootstrap'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        displayAuth: false,
    }

    authShowHideEvent() {
        this.setState({
            displayAuth: !this.state.displayAuth,
        });
    }

    login() {

    }

    render() {
        return (
            <header className="position-fixed col-12 top-0">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Blog</Navbar.Brand>
                        <Nav className="col-10 d-inline-block text-end">
                            <Nav.Item onClick={() => this.authShowHideEvent()}
                                      className="d-inline-block"
                                      href="#auth">Auth</Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>

                {
                    this.state.displayAuth===true && (
                    <div className="bg-light col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6 position-absolute top-100 end-0 p-2">
                    <Form.Control size="lg" type="text" placeholder="Large text" />
                    <br />
                    <Form.Control type="text" placeholder="Normal text" />
                    <br />
                    <Form.Control size="sm" type="text" placeholder="Small text" />
                    </div>
                    )
                }
            </header>
        )
    }
}

