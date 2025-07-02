import { useEffect, useState } from "react"
import http from "../library/http"
import { Loading } from "./Loading"
import { Link, Outlet } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"

export const FrontLayout = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        http.get('/categories')
            .then(({data}) => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <>
        <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    MERN BCT
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="ms-auto">
                        {categories.map(category => <Nav.Item key={category._id}>
                            <Link to={`/categories/${category._id}`} className="nav-link">{category.name}</Link>
                        </Nav.Item>)}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <Outlet />
        </Container>
    </>
}