import { useEffect, useState } from "react"
import http from "../../library/http"
import { Loading } from "../../components/Loading"
import { Col, Row } from "react-bootstrap"
import { imgUrl } from "../../library/functions"
import { Link } from "react-router-dom"

export const FrontHome = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/articles')
            .then(({ data }) => setArticles(data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    {articles.map(article => <Col md="4" className="mb-3">
                        <Row>
                            {article.image && <Col xs="4">
                                <img className="img-fluid" src={imgUrl(article.image)} />
                            </Col>}
                            <Col>
                                <Row>
                                    <Col xs="12">
                                        <h5>{article.title}</h5>
                                    </Col>
                                    <Col xs="12" className="mt-3">
                                        <Link className="btn btn-dark btn-sm" to={`/articles/${article._id}`}>
                                            <i className="bi bi-newspaper me-2"></i>Read Article
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>)}
                </Row>
            </Col>
        </Row>
    </>
}