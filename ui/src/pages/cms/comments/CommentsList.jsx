import { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../library/http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"

export const CommentsList = () => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/comments')
            .then(({data}) => setComments(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        if(confirm('Are you sure?')) {
            setLoading(true)

            http.delete(`/cms/comments/${id}`)
                .then(() => http.get('/cms/comments'))
                .then(({ data }) => setComments(data))
                .catch(() => { })
                .finally(() => setLoading(false))
        }
    }

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Comments</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {comments.length > 0 ? <Table striped hover bordered size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Comment</th>
                                    <th>Article</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map(comment => <tr key={comment._id}>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.content}</td>
                                    <td>
                                        <a href={`/cms/articles/${comment.articleId}`} className="btn btn-dark btn-sm" target="_blank">
                                            <i className="bi bi-eye me-2"></i>View
                                        </a>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(comment._id)}>
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