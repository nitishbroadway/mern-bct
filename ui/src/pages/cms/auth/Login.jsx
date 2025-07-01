import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import http from "../../../library/http"
import { useDispatch } from "react-redux"
import { setUser } from "../../../store/user.slice"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please provide an email').email(),
            password: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.post('/auth/login', data)
                .then(({data}) => {
                    localStorage.setItem('mbcttoken', data.token)

                    return http.get('/profile/details')
                })
                .then(({data}) => {
                    dispatch(setUser(data))

                    navigate('/cms')
                })
                .catch(({response}) => {
                    if('validation' in response.data) {
                        formik.setErrors(response.data.validation)
                    }
                })
                .finally(() => setSubmitting(false))
        }
    })

    return <>
        <Row className="vh-100 align-items-center justify-content-center">
            <Col lg="4" className="bg-white my-5 py-3 rounded-2 shadow-sm mx-auto">
                <h1 className="text-center">Log In</h1>
                <Form onSubmit={formik.handleSubmit}>
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

                    <Button variant="dark" type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? <>
                            <Spinner animation="border" className="me-2" size="sm" variant="light" />Processing...
                        </> : <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>Log In
                        </>}
                    </Button>
                </Form>
            </Col>
        </Row>
    </>
}