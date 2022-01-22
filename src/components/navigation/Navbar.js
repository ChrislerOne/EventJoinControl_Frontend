import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons"
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import LoginComponent from "../auth/Login";
import React from "react";
import {useSelector} from "react-redux";

export default function NavbarComponent(props) {
    let user = useSelector((state) => state.auth.value);
    let userPermissionState = props.userPermissionState;

    if (user) {
        user = JSON.parse(user);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(getAuth(props.app)).then(() => {
                navigate('/')
                toast.success('Bis bald!')
            }
        );
    }

    const NavPermission = () => {
        if (user && userPermissionState) {
            switch(userPermissionState.name){
                case 'owner':
                    return (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/organization">Meine Organisation</Nav.Link>
                            <NavDropdown title='Events'>
                                <NavDropdown.Item as={Link} to="/events">Alle Events</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/events">Meine Events</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )
                case 'user':
                    return (
                        <Nav className="me-auto">
                            <NavDropdown title='Events'>
                                <NavDropdown.Item as={Link} to="/events">Alle Events</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/events">Meine Events</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )
                default:
                    return(<div/>)
            }
        }
        return (<Nav className="me-auto"/>)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">EvJoCo </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavPermission/>
                    <Navbar.Collapse className="justify-content-end">
                        {user ?
                            <Nav>
                                <Navbar.Text>
                                    <div className="mx-md-3">
                                        Signed in as: <Link as={Link} to="/user">{user.email}</Link>
                                    </div>
                                </Navbar.Text>
                                <Nav.Link
                                    onClick={handleLogout}><BoxArrowRight/>Logout
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <NavDropdown title="Login"><LoginComponent
                                    setReloadUser={props.setReloadUser}
                                    app={props.app}
                                    setUserPermissionState={(userPermissionState) => props.setUserPermissionState(userPermissionState)}
                                    userPermissionState={props.userPermissionState}/>
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
