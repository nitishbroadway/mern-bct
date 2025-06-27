import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/ReactToastify.css"
import "./CmsLayout.css"

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"

export const CmsLayout = () => {
    const user = null

    return <>
        {user && <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    MERN BCT
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav>
                        <Nav.Item>
                            <Link className="nav-link" to="#">
                                Link
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="#">
                                Link
                            </Link>
                        </Nav.Item>
                    </Nav>

                    <Nav className="ms-auto">
                        <NavDropdown title={'Demo User'} align="end">
                            <Link className="dropdown-item" to="#">Item</Link>
                            <Link className="dropdown-item" to="#">Item</Link>
                            <NavDropdown.Divider />
                            <Link className="dropdown-item" to="#">Item</Link>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>}

        <Container>
            <Outlet />
        </Container>
    </>
}