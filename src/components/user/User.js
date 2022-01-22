import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {getAllUserEvents, getQrCode} from "../api/requests";
import {getAuth, updateProfile} from "firebase/auth";
import {toast} from "react-toastify";
import {TailSpin} from "react-loader-spinner";
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector} from "react-redux";

export default function UserComponent(props) {
    const [qrCode, setQrCode] = useState(undefined)
    const [displayName, setDisplayName] = useState("")
    const [eventData, setEventData] = useState([]);

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        async function get() {
            getQrCode(user).then((r) => {
                setQrCode("data:image/jpeg;charset=utf-8;base64," + r);
            })
            await getAllUserEvents(user).then((r) => {
                console.log(r);
                if (r === null) {
                    toast.info('Es scheint als hättest du noch keine Veranstaltungen besucht!')
                } else {
                    setEventData(r);
                }
            })
        }

        if (user) {
            get()
        }
    }, [])

    const handelDisplayName = (e) => {
        e.preventDefault();
        let bool;
        bool = props.reloadUser !== true;
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            props.setReloadUser(bool)
            toast.success('Name erfolgreich aktualisiert!')
        }).catch((error) => {
            toast.error('Wir konnten deinen Namen leider nicht ändern. Probiere es doch später erneut.')
        });
    }

    const columns = [{
        dataField: 'organizationId.name',
        text: 'Organisation'
    }, {
        dataField: 'name',
        text: 'Veranstaltung'
    }, {
        dataField: 'stateId.name',
        text: 'Status'
    }]

    return (
        <Container className="my-md-4">
            <h1>Hey {user.displayName} </h1>
            <Row>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h5 className="py-md-2 text-uppercase text-primary"> Account</h5>
                        <Row>
                            <Col>
                                <p>E-Mail:</p>
                            </Col>
                            <Col>
                                <p>{user.email}</p>
                            </Col>
                            <hr/>
                        </Row>
                        <Form onSubmit={handelDisplayName}>
                            <Form.Group className="mb-3" controlId="formBasicDisplayName">
                                <Form.Control type="text"
                                              placeholder="Wie willst du genannt werden?"
                                              value={displayName}
                                              onChange={(e) => {
                                                  setDisplayName(e.target.value)
                                              }}/>
                            </Form.Group>
                            <Button type="submit">Nickname ändern</Button>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <div className="d-flex justify-content-center shadow-sm p-3 mb-5 bg-light rounded">
                        {qrCode ?
                            <img
                                className="img-fluid"
                                src={qrCode} alt=""/>
                            :
                            <TailSpin
                                heigth="200"
                                width="200"
                                color='grey'
                                ariaLabel='loading'
                            />
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h5 className="py-md-2 text-uppercase text-primary"> Meine Veranstaltungen</h5>
                        <BootstrapTable keyField='id'
                                        data={eventData}
                                        columns={columns}
                                        striped
                                        hover
                                        condensed/>
                    </div>
                </Col>
            </Row>
        </Container>)
}
