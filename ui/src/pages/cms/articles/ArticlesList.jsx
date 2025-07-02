import { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../library/http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"
import { imgUrl } from "../../../library/functions"

export const ArticlesList = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/articles')
            .then(({data}) => setArticles(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        if(confirm('Are you sure?')) {
            setLoading(true)

            http.delete(`/cms/articles/${id}`)
                .then(() => http.get('/cms/articles'))
                .then(({ data }) => setArticles(data))
                .catch(() => { })
                .finally(() => setLoading(false))
        }
    }

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Articles</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/cms/articles/create" className="btn btn-dark">
                            <i className="bi bi-plus me-2"></i>Add New
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {articles.length > 0 ? <Table striped hover bordered size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => <tr key={article._id}>
                                    <td>{article.title}</td>
                                    <td>{article.image && <a href={imgUrl(article.image)} target="_blank">
                                        <img src={imgUrl(article.image)} className="img-sm" />
                                    </a>}</td>
                                    <td>
                                        <Link to={`/cms/articles/${article._id}`} className="btn btn-dark btn-sm me-3" title="Edit">
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(article._id)}>
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