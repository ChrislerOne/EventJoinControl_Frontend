import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getStatusByToken, postChangeUserState} from "../api/requests";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

export default function QrCodeCheckComponent(props) {
    const [state, setState] = useState("")
    const params = useParams();
    const userPermission = props.userPermissionState;
    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }
    console.log(userPermission);

    const handleVaccinated = () => {
        postChangeUserState(user, params.qrCode, 'vaccinated').then(() => {
            toast.success('Status wurde geändert');
            setState('vaccinated');
        })
    }
    const handleTested = () => {
        postChangeUserState(user, params.qrCode, 'verified').then(() => {
            toast.success('Status wurde geändert');
            setState('verified');
        })
    }

    const ChangeStatusComponent = () => {
        if (user && userPermission) {
            if (userPermission.length !== 0) {
                if (userPermission[0].user.qrToken !== params.qrCode) {
                    return (<>
                            <Col className="py-4 text-center">
                                <h3 className="text-secondary text-uppercase">Status ändern</h3>
                            </Col>
                            <Col className="text-center">
                                <Button onClick={() => {
                                    handleVaccinated()
                                }} className="mx-1" variant="primary"
                                        size="lg">VACCINATED</Button>
                                <Button onClick={() => {
                                    handleTested()
                                }} className="mx-1" variant="primary"
                                        size="lg">TESTED</Button>
                            </Col>
                        </>
                    )
                }
            }
        }
        return (<></>)
    }

    const BoxComponent = () => {
        switch (state) {
            case 'COVID-19 positive':
                return (<div style={{display: 'flex', height: '50px', backgroundColor: 'red'}}
                             className="p-3"/>);
            case 'restricted':
                return (<div style={{display: 'flex', height: '50px', backgroundColor: 'red'}}
                             className="p-3"/>);
            case 'vaccinated':
                return (<div style={{display: 'flex', height: '50px', backgroundColor: 'forestgreen'}}
                             className="p-3"/>);
            case 'verified':
                return (<div style={{display: 'flex', height: '50px', backgroundColor: 'forestgreen'}}
                             className="p-3"/>);
            default:
                return (<div style={{display: 'flex', height: '50px', backgroundColor: 'orange'}}
                             className="p-3"/>);
        }
    }

    useEffect(() => {
        getStatusByToken(params.qrCode).then((r) => {
            setState(r.name);
        })
    }, [])

    return (
        <Container className="p-4">
            <Row xs={1}>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded p-3">
                        <h1 className="text-center text-primary">Status:
                            <p className="text-secondary">{state}</p>
                            <BoxComponent/>
                        </h1>
                    </div>
                </Col>
                <hr/>
                <ChangeStatusComponent/>
            </Row>
        </Container>
    )
}
