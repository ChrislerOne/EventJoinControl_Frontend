import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getStatusByToken} from "../api/requests";

export default function QrCodeCheckComponent(props) {
    const [state, setState] = useState("")
    const params = useParams();

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
            </Row>
        </Container>
    )
}
