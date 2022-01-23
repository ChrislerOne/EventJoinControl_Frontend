import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAllUserTypes, postGrantPermissionForSpecificOrganization} from "../api/requests";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

export function AddUserToOrganizationComponent(props) {
    const [userTypeData, setUserTypeData] = useState([])
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState()


    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        getAllUserTypes(user).then((r) => {
            setUserTypeData(r);
        })
    }, [])

    const OptionsList = () => {
        return (userTypeData.map((e, key) => {
            return <option key={key} value={e.id}>{e.name}</option>
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postGrantPermissionForSpecificOrganization(user, email, props.organizationId, userType).then((r) => {
            toast.success('User mit E-Mail ' + email + ' wurde als ' + userType + 'angelegt!')
        }).catch((err) => {
            toast.error('Leider konnte kein User mit der E-Mail gefunden werden.')
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row md={3}>
                <Col>
                    <FormControl
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                </Col>
                <Col>
                    <FormControl
                        as="select"
                        onChange={(e) => {
                            setUserType(e.target.value);
                        }}
                    >
                        <OptionsList/>
                    </FormControl>
                </Col>
                <Col>
                    <Button type="submit">Anlegen</Button>
                </Col>
            </Row>
        </Form>
    )
}
