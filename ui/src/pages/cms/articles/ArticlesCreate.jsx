import { useFormik } from "formik"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import * as Yup from "yup"
import http from "../../../library/http"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loading } from "../../../components/Loading"

export const ArticlesCreate = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categoryId: '',
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            content: Yup.string().required(),
            categoryId: Yup.string().required(),
            image: Yup.mixed().nullable(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            const fd = new FormData

            for(let k in data) {
                fd.append(k, data[k])
            }

            http.post('/cms/articles', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => navigate('/cms/articles'))
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

        http.get('/cms/categories')
            .then(({data}) => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Add Article</h1>
                    </Col>
                </Row>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title</Form.Label>

                        <Form.Control
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            isInvalid={formik.touched.title && formik.errors.title}
                            isValid={formik.values.title && !formik.errors.title}
                        />

                        {formik.touched.title && formik.errors.title && <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
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

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoryId">Category</Form.Label>

                        <Form.Select
                            name="categoryId"
                            id="categoryId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.categoryId}
                            isInvalid={formik.touched.categoryId && formik.errors.categoryId}
                            isValid={formik.values.categoryId && !formik.errors.categoryId}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                        </Form.Select>

                        {formik.touched.categoryId && formik.errors.categoryId && <Form.Control.Feedback type="invalid">
                            {formik.errors.categoryId}
                        </Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">Image</Form.Label>

                        <Form.Control
                            name="image"
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={event => formik.setFieldValue('image', event.target.files[0])}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.image && formik.errors.image}
                            isValid={formik.values.image && !formik.errors.image}
                        />

                        {formik.touched.image && formik.errors.image && <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
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