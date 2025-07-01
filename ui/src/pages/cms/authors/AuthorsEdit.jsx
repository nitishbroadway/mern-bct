import { useFormik } from "formik"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import * as Yup from "yup"
import http from "../../../library/http"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loading } from "../../../components/Loading"

export const AuthorsEdit = () => {
    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch(`/cms/authors/${params.id}`, data)
                .then(() => navigate('/cms/authors'))
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

        http.get(`/cms/authors/${params.id}`)
            .then(({data}) => setAuthor(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        formik.setValues({
            name: author?.name,
            email: author?.email,
            phone: author?.phone,
            address: author?.address,
        })
    }, [author])

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Edit Author</h1>
                    </Col>
                </Row>
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
                        <Form.Label htmlFor="phone">Phone</Form.Label>

                        <Form.Control
                            name="phone"
                            id="phone"
                            type="text"
                            placeholder="Enter phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            isInvalid={formik.touched.phone && formik.errors.phone}
                            isValid={formik.values.phone && !formik.errors.phone}
                        />

                        {formik.touched.phone && formik.errors.phone && <Form.Control.Feedback type="invalid">
                            {formik.errors.phone}
                        </Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="address">Address</Form.Label>

                        <Form.Control
                            name="address"
                            id="address"
                            as="textarea"
                            placeholder="Enter address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            isInvalid={formik.touched.address && formik.errors.address}
                            isValid={formik.values.address && !formik.errors.address}
                        />

                        {formik.touched.address && formik.errors.address && <Form.Control.Feedback type="invalid">
                            {formik.errors.address}
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
        </Row>
    </>
}