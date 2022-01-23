import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";

export function NewEventFormComponent() {

    return (
        <Form>
            <Row>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="text" placeholder="Eventname"/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="date" placeholder="Eventdatum"/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="time" placeholder="Eventdatum"/>
                    </FormGroup>
                </Col>
            </Row>
            <Button variant="outline-primary" type="submit">Erstellen</Button>
        </Form>
    )
}
