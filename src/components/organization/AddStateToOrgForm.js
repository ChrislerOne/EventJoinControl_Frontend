import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    getAllStates,
    getAllUserTypes,
    postaddStateToOrganization,
    postGrantPermissionForSpecificOrganization
} from "../api/requests";
import {toast} from "react-toastify";

export function AddStateToOrgForm(props) {
    const [allowedStates, setAllowedStates] = useState([])
    const [stateid, setStateid] = useState()

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        getAllStates(user).then((r) => {
            setAllowedStates(r);
        })
    }, [])

    const OptionsList = () => {
        return (allowedStates.map((e, key) => {
            if (e.name !== 'user') {
                return <option key={key} value={e.id}>{e.name}</option>
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postaddStateToOrganization(user, stateid, props.organizationid).then((r) => {
            toast.success('Status wurde erfolgreich hinzugefügt.')
            props.render();
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="my-3">
                <Row md={3}>
                    <Col>
                        <FormControl
                            as="select"
                            onChange={(e) => {
                                setStateid(e.target.value);
                            }}>
                            <OptionsList/>
                        </FormControl>
                    </Col>
                    <Col>
                        <Button type="submit">Hinzufügen</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
