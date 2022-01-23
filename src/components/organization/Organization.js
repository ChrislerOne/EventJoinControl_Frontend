import {Col, Container, Row, Button} from "react-bootstrap";
import {NewEventFormComponent} from "../events/newEventForm";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArrowLeftCircleFill, Trash, Trash2Fill} from "react-bootstrap-icons";
import {deleteEvent, getAllEventsByOrganizationId} from "../api/requests";
import {useSelector} from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import {toast} from "react-toastify";
import {AddUserToOrganizationComponent} from "./AddUserToOrganization";

export default function OrganizationComponent(props) {
    const [tableData, setTableData] = useState([]);
    const [render, setRender] = useState(false);
    const {organizationId} = useParams()
    const organizationObj = props.userPermissionState.filter(e => e.organization.id === parseInt(organizationId))[0];
    const navigate = useNavigate();

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        getAllEventsByOrganizationId(user, organizationId).then((r) => {
            console.log(r);
            setTableData(r);
        })
    }, [render])

    const deleteButton = (cell, row, rowIndex, formatExtraData) => {
        return (<Button onClick={() => handleDeleteEvent(row.id)} variant="outline-danger"><Trash/></Button>)
    }

    const columns = [{
        dataField: 'organizationId.name',
        text: 'Organisation',
        sort: true
    }, {
        dataField: 'name',
        text: 'Veranstaltung',
        sort: true
    }, {
        dataField: 'eventStart',
        text: 'Start',
        sort: true
    }, {
        dataField: 'eventEnd',
        text: 'Ende',
        sort: true
    }, {
        dataField: 'stateId.name',
        text: 'Status',
        sort: true
    }, {
        dataField: "delete",
        formatter: deleteButton
    }]

    const defaultSorted = [{
        dataField: 'stateId.name',
        order: 'desc'
    }];


    const rerender = () => {
        let bool;
        bool = render === false;
        setRender(bool);
    }

    const handleDeleteEvent = (eventId) => {
        deleteEvent(user, eventId).then(() => {
            toast.success('Event gelöscht!');
            rerender();
        })
    }

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
                        <h3 className="text-secondary text text-uppercase">User Verwaltung</h3>
                        <AddUserToOrganizationComponent
                            organizationId={organizationId}/>
                    </div>
                </Col>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h3 className="text-secondary text text-uppercase">Neues Event</h3>
                        <NewEventFormComponent
                            setRender={rerender}
                            organizationId={organizationId}/>
                    </div>
                </Col>
            </Row>
            <Row xs={1}>
                <Col>
                    <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                        <h3 className="text-secondary text text-uppercase">Alle Events</h3>
                        {/*{tableData === [] ?*/}
                        <BootstrapTable keyField='id'
                                        data={tableData}
                                        columns={columns}
                                        defaultSorted={defaultSorted}/>
                        {/*: <p className="text-secondary text-center">Es sind noch keine Events vorhanden</p>}*/}
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
