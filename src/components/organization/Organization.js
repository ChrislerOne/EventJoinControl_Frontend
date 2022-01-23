import {Col, Container, Row, Button} from "react-bootstrap";
import {NewEventFormComponent} from "../events/newEventForm";
import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect} from "react";
import {ArrowLeft, ArrowLeftCircle, ArrowLeftCircleFill} from "react-bootstrap-icons";

export default function OrganizationComponent(props) {
    const {organizationId} = useParams()
    const organizationObj = props.userPermissionState.filter(e => e.organization.id === parseInt(organizationId))[0];
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <h1 className="text-primary text-uppercase p-3">
                    <ArrowLeftCircleFill className="p-3" size={70} color="#1a6aeb"
                                         as={Button}
                                         onClick={() => navigate(-1)}
                    />{organizationObj.organization.name}
                </h1>
            </Row>
            <Row className="py-4" xs={1} md={2}>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h3 className="text-secondary text text-uppercase">Eckdaten</h3>
                        <p className="text-primary text text-uppercase"></p>
                    </div>
                </Col>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h3 className="text-secondary text text-uppercase">Neues Event</h3>
                        <NewEventFormComponent/>
                    </div>
                </Col>
            </Row>
            <Row xs={1}>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h3 className="text-secondary text text-uppercase">Alle Events</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
