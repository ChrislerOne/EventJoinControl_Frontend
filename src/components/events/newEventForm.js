import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {postAddEventToOrganization} from "../api/requests";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

export function NewEventFormComponent(props) {
    const [eventName, setEventName] = useState("");
    const [eventTimeStart, setEventTimeStart] = useState();
    const [eventDateStart, setEventDateStart] = useState();
    const [eventTimeEnd, setEventTimeEnd] = useState();
    const [eventDateEnd, setEventDateEnd] = useState();

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    const handleEventCreation = (e) => {
        e.preventDefault();
        // TODO: Timezone stimmt noch nicht.
        const eventStart = new Date(eventDateStart + " " + eventTimeStart);
        const eventEnd = new Date(eventDateEnd + " " + eventTimeEnd);
        postAddEventToOrganization(user, eventName, props.organizationId, eventStart, eventEnd).then((r) => {
            toast.success("Event " + eventName + " erstellt!");
            props.setRender();
        })
    }

    return (
        <Form onSubmit={handleEventCreation}>
            <Row>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="text"
                                     required={true}
                                     placeholder="Eventname"
                                     value={eventName}
                                     onChange={(e) => {
                                         setEventName(e.target.value)
                                     }}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row xs={1} md={3}>
                <Col>
                    <p className="text-secondary">Start</p>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="date"
                                     placeholder="Eventdatum"
                                     required={true}
                                     value={eventDateStart}
                                     onChange={(e) => {
                                         setEventDateStart(e.target.value);
                                         setEventDateEnd(e.target.value);
                                     }}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="time"
                                     placeholder="Eventdatum"
                                     required={true}
                                     value={eventTimeStart}
                                     onChange={(e) => {
                                         setEventTimeStart(e.target.value)
                                     }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row xs={1} md={3}>
                <Col>
                    <p className="text-secondary">End</p>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="date"
                                     placeholder="Eventdatum"
                                     value={eventDateEnd}
                                     onChange={(e) => {
                                         setEventDateEnd(e.target.value)
                                     }}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <FormControl type="time"
                                     placeholder="Eventdatum"
                                     value={eventTimeEnd}
                                     onChange={(e) => {
                                         setEventTimeEnd(e.target.value)
                                     }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button variant="outline-primary" type="submit">Erstellen</Button>
        </Form>
    )
}
