import { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../library/http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"

export const AuthorsList = () => {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/authors')
            .then(({data}) => setAuthors(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        if(confirm('Are you sure?')) {
            setLoading(true)

            http.delete(`/cms/authors/${id}`)
                .then(() => http.get('/cms/authors'))
                .then(({ data }) => setAuthors(data))
                .catch(() => { })
                .finally(() => setLoading(false))
        }
    }

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Authors</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/cms/authors/create" className="btn btn-dark">
                            <i className="bi bi-plus me-2"></i>Add New
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {authors.length > 0 ? <Table striped hover bordered size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map(author => <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td>{author.phone}</td>
                                    <td>{author.address}</td>
                                    <td>
                                        <Link to={`/cms/authors/${author._id}`} className="btn btn-dark btn-sm me-3" title="Edit">
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(author._id)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table> : <h4>No data found!</h4>}
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}