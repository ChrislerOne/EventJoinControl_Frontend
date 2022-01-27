import {Col, Container, Row, Button} from "react-bootstrap";
import {NewEventFormComponent} from "../events/newEventForm";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArrowLeftCircleFill, Trash, Trash2Fill} from "react-bootstrap-icons";
import {
    deleteEvent, deleteOrganizationState, delteOrganizationState,
    getAllEventsByOrganizationId, getAllStatesAllowedByOrganization,
    getUsersByOrganization,
    revokePermissionFromUser
} from "../api/requests";
import {useSelector} from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import {toast} from "react-toastify";
import {AddUserToOrganizationComponent} from "./AddUserToOrganization";
import {TailSpin, ThreeDots} from "react-loader-spinner";
import {AddStateToOrgForm} from "./AddStateToOrgForm";

export default function OrganizationComponent(props) {
    const [tableData, setTableData] = useState([]);
    const [userTableData, setUserTableData] = useState([]);
    const [orgStates, setOrgStates] = useState([])
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
            setTableData(r);
        });
        getUsersByOrganization(user, organizationId).then((r) => {
            setUserTableData(r);
        });
        getAllStatesAllowedByOrganization(user, organizationId).then((r) => {
            console.log(r);
            setOrgStates(r);
        });
    }, [render])

    const deleteButton = (cell, row, rowIndex, formatExtraData) => {
        return (<Button onClick={() => handleDeleteEvent(row.id)} variant="outline-danger"><Trash/></Button>)
    }
    const deleteStateButton = (cell, row, rowIndex, formatExtraData) => {
        return (<Button onClick={() => handleDeleteState(row.id)} variant="outline-danger"><Trash/></Button>)
    }

    const deleteUserButton = (cell, row, rowIndex, formatExtraData) => {
        if (row.userType.name !== 'owner') {
            return (
                <Button onClick={() => handleDeleteUserPermission(row.id)} variant="outline-danger"><Trash/></Button>)
        } else {
            return (<></>)
        }
    }

    const formatDate = (cell, row, rowIndex, formatExtraData) => {
        const date = new Date(cell);
        return (<>{date.toLocaleDateString('de-DE')} {date.toLocaleTimeString('de-DE')} Uhr</>)
    }

    const columnsEvents = [{
        dataField: 'organizationId.name', text: 'Organisation', sort: true
    }, {
        dataField: 'name', text: 'Veranstaltung', sort: true
    }, {
        dataField: 'eventStart', text: 'Start', sort: true, formatter: formatDate
    }, {
        dataField: 'eventEnd', text: 'Ende', sort: true, formatter: formatDate
    }, {
        dataField: 'stateId.name', text: 'Status', sort: true
    }, {
        dataField: "delete", formatter: deleteButton
    }]

    const columnsUserTable = [{
        dataField: 'user.email', text: 'E-Mail', sort: true
    }, {
        dataField: 'userType.name', text: 'Zugriffsberechtigung', sort: true
    }, {
        dataField: "delete", text: 'Aktion', formatter: deleteUserButton
    }]

    const columnsOrgState = [{
        dataField: 'stateId.name', text: 'Status', sort: true
    }, {
        dataField: "delete", text: 'Aktion', formatter: deleteStateButton
    }]

    const defaultSortedEvents = [{
        dataField: 'stateId.name', order: 'desc'
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

    const handleDeleteUserPermission = (id) => {
        revokePermissionFromUser(user, id).then(() => {
            toast.success('User wurde aus der Organisation entfernt.');
            rerender();
        })
    }
    const handleDeleteState = (id) => {
        deleteOrganizationState(user, id).then(() => {
            toast.success('State wurde aus der Organisation entfernt.');
            rerender();
        })
    }

    return (<Container>
        <Row>
            <h1 className="text-primary text-uppercase p-3">
                <ArrowLeftCircleFill className="p-3" size={70} color="#6222CC"
                                     as={Button}
                                     onClick={() => navigate(-1)}
                />{organizationObj.organization.name}
            </h1>
        </Row>
        <Row>
            <Col>
                <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                    <h4 className="text-secondary text text-uppercase">Verwaltung</h4>
                    <AddUserToOrganizationComponent
                        render={() => rerender()}
                        organizationId={organizationId}/>
                    <div className="py-3">
                        <BootstrapTable
                            keyField='id'
                            data={userTableData}
                            columns={columnsUserTable}
                            noDataIndication={<TailSpin color="grey"/>}/>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="py-4" xs={1} md={2}>
            <Col>
                <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                    <h4 className="text-secondary text-uppercase">Erlaubte Stati</h4>
                    <AddStateToOrgForm
                        render={() => rerender()}
                        organizationid={organizationId}/>
                    <BootstrapTable
                        keyField='id'
                        data={orgStates}
                        columns={columnsOrgState}
                        noDataIndication={<ThreeDots color="grey"/>}/>
                </div>
            </Col>
            <Col>
                <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                    <h4 className="text-secondary text text-uppercase">Neues Event</h4>
                    <NewEventFormComponent
                        setRender={rerender}
                        organizationId={organizationId}/>
                </div>
            </Col>

        </Row>
        <Row xs={1}>
            <Col>
                <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                    <h4 className="text-secondary text text-uppercase">Alle Events</h4>
                    <BootstrapTable keyField='id'
                                    data={tableData}
                                    columns={columnsEvents}
                                    defaultSorted={defaultSortedEvents}
                                    noDataIndication={<TailSpin color="grey"/>}/>
                </div>
            </Col>
        </Row>
    </Container>)

}
