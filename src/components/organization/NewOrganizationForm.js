import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {postCreateOrganization} from "../api/requests";
import {toast} from "react-toastify";

export default function NewOrganizationForm(props) {
    const [orgName, setOrgName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        postCreateOrganization(props.user, orgName, description).then(() => {
            toast.success('Organisation ' + orgName + ' erfolgreich erstellt!')
            props.reload();
        }).catch(() => {
            toast.error('Leider konnten wir die Organisation nicht erstelle. Probiere es doch bitte erneut!')
        })
    }

    return (
        <div>
            <h4 className="px-3 py-1 text-secondary text-uppercase">Neue Organisation erstellen</h4>
            <Form className="p-3" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={4}>
                        <Form.Control
                            onChange={(e) => setOrgName(e.target.value)}
                            value={orgName}
                            placeholder="Organisationsname"/>
                    </Col>
                    <Col xs={6}>
                        <Form.Control
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Beschreibung"/>
                    </Col>
                    <Col xs={2}>
                        <Button type="submit" variant="outline-primary" className="end-100">Erstellen</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
