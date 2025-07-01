import { useFormik } from "formik"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import * as Yup from "yup"
import http from "../../../library/http"
import { useNavigate } from "react-router-dom"

export const AuthorsCreate = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.post('/cms/authors', data)
                .then(() => navigate('/cms/authors'))
                .catch(({ response }) => {
                    if ('validation' in response.data) {
                        formik.setErrors(response.data.validation)
                    }
                })
                .finally(() => setSubmitting(false))
        }
    })

    return <>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Add Author</h1>
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
                        <Form.Label htmlFor="password">Password</Form.Label>

                        <Form.Control
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.password && formik.errors.password}
                            isValid={formik.values.password && !formik.errors.password}
                        />

                        {formik.touched.password && formik.errors.password && <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
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