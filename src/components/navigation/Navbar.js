import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {BoxArrowDownLeft, BoxArrowInRight, BoxArrowRight} from "react-bootstrap-icons"
import {Link} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import LoginComponent from "../auth/Login";
import React from "react";

export default function NavbarComponent(props) {
    let user = props.user;

    const handleLogout = () => {
        signOut(getAuth(props.app)).then(() => {
                localStorage.clear()
                props.setUser(undefined);
                toast.success('Bis bald! ')
            }
        );

    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">EvJoCo </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {user ?
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Verwaltung" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Organisation</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Veranstaltungen</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Status</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : <Nav className="me-auto"/>
                    }
                    <Navbar.Collapse className="justify-content-end">
                        {user ?
                            <Nav>
                                <Navbar.Text>
                                    Signed in as: <Link as={Link} to="/user">{user.email}</Link>
                                </Navbar.Text>
                                <Nav.Link onClick={handleLogout}><BoxArrowRight/>Logout</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <NavDropdown title="Login"><LoginComponent
                                    setUser={(user) => props.setUser(user)}
                                    user={props.user}
                                    app={props.app}/>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/signup">
                                    <div style={{marginLeft: "6px"}}>Sign Up</div>
                                </Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
