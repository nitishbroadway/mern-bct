import { useEffect, useState } from "react"
import http from "../../library/http"
import { Loading } from "../../components/Loading"
import { Col, Row } from "react-bootstrap"
import { imgUrl } from "../../library/functions"
import { Link, useParams } from "react-router-dom"

export const Category = () => {
    const [category, setCategory] = useState(null)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`/categories/${params.id}`)
            .then(({ data }) => {
                setCategory(data)

                return http.get(`/categories/${params.id}/articles`)
            })
            .then(({data}) => setArticles(data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <h2 className="text-center">Category: {category.name}</h2>
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