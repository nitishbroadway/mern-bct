import { Button, Col, Form, Row } from "react-bootstrap"

export const Login = () => {
    return <>
        <Row className="vh-100 align-items-center justify-content-center">
            <Col lg="4" className="bg-white my-5 py-3 rounded-2 shadow-sm mx-auto">
                <h1 className="text-center">Log In</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>

                        <Form.Control
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>

                        <Form.Control
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter password"
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        <i className="bi bi-box-arrow-in-right me-2"></i>Log In
                    </Button>
                </Form>
            </Col>
        </Row>
    </>
}