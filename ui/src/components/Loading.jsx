import { Col, Row, Spinner } from "react-bootstrap"

export const Loading = () => {
    return <Row>
        <Col className="text-center my-3 py-3">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading...
        </Col>
    </Row>
}