import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../library/http"
import { Loading } from "../../components/Loading"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { imgUrl } from "../../library/functions"
import { useFormik } from "formik"
import * as Yup from "yup"

export const Article = () => {
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            content: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            content: Yup.string().required(),
        }),
        onSubmit: (data, { setSubmitting, resetForm }) => {
            http.post(`/articles/${params.id}/comments`, data)
                .then(() => {
                    resetForm()

                    return http.get(`/articles/${params.id}`)
                })
                .then(({ data }) => {
                    setArticle(data)
                    return http.get(`/articles/${params.id}/comments`)
                })
                .then(({ data }) => setComments(data))
                .catch(({ response }) => {
                    if ('validation' in response.data) {
                        formik.setErrors(response.data.validation)
                    }
                })
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get(`/articles/${params.id}`)
            .then(({data}) => {
                setArticle(data)
                return http.get(`/articles/${params.id}/comments`)
            })
            .then(({data}) => setComments(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col xs="12" className="text-center">
                        <h1>{article.title}</h1>
                    </Col>

                    {article.image && <Col xs="12">
                        <img src={imgUrl(article.image)} className="img-fluid" />
                    </Col>}

                    <Col xs="12" className="my-3">
                        {article.content}
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <h4><i className="bi bi-chat-text me-2"></i>Add Comment</h4>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="name">Name</Form.Label>

                                <Form.Control
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    isInvalid={formik.touched.name && formik.errors.name}
                                    isValid={formik.values.name && !formik.errors.name}
                                />

                                {formik.touched.name && formik.errors.name && <Form.Control.Feedback type="invalid">
                                    {formik.errors.name}
                                </Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="email">Email</Form.Label>

                                <Form.Control
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    isValid={formik.values.email && !formik.errors.email}
                                />

                                {formik.touched.email && formik.errors.email && <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="content">Content</Form.Label>

                                <Form.Control
                                    name="content"
                                    id="content"
                                    as="textarea"
                                    placeholder="Enter content"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.content}
                                    isInvalid={formik.touched.content && formik.errors.content}
                                    isValid={formik.values.content && !formik.errors.content}
                                />

                                {formik.touched.content && formik.errors.content && <Form.Control.Feedback type="invalid">
                                    {formik.errors.content}
                                </Form.Control.Feedback>}
                            </Form.Group>

                            <Button variant="dark" type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? <>
                                    <Spinner animation="border" className="me-2" size="sm" variant="light" />Processing...
                                </> : <>
                                    <i className="bi bi-floppy me-2"></i>Save
                                </>}
                            </Button>
                        </Form>
                    </Col>

                    <Col>
                        <h4>
                            <i className="bi bi-chat me-2"></i>Comments
                        </h4>
                        {comments.length > 0 ? comments.map(comment => <div key={comment._id} className="text-bg-secondary p-3 mb-3 rounded-2">
                            <Row>
                                <Col xs="12">
                                    <strong className="me-2">{comment.name}</strong><small>{comment.email}</small><br />
                                    <br />
                                    {comment.content}
                                </Col>
                            </Row>
                        </div>) : <h5>No comments yet!</h5>}
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}