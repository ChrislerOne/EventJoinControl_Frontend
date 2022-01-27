import {Button, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom';
import NewOrganizationForm from "./NewOrganizationForm";
import {deleteOrganization} from "../api/requests";
import {toast} from "react-toastify";
import {useEffect} from "react";

export default function UserOrganizationsComponent(props) {
    let userOrgs;
    if (props.userPermissionState) {
        userOrgs = props.userPermissionState.filter(e => e.userType.name === 'owner' || e.userType.name === 'staff')
    }
    const navigate = useNavigate();

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        props.reload();
    }, [])

    const OrganizationCard = (props) => {
        const handleClick = (id) => {
            navigate('/organization/' + id)
        }

        const handleDeleteOrganization = (id) => {
            deleteOrganization(user, id).then(() => {
                toast.success('Deine Organization wurde erfolgreich gelöscht!');
                props.reload();
            })
        }

        return (<div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
            <h3 className="text-primary">{props.organization}</h3>
            <hr/>
            <Button variant="outline-primary" onClick={() => {
                handleClick(props.id)
            }}>Anzeigen</Button>
            {props.permissionName === 'owner' ?
                <Button className="mx-3" variant="outline-danger"
                        onClick={() => handleDeleteOrganization(props.id)}>LÖSCHEN</Button>
                : <></>}
        </div>)
    }

    const UserOrganizations = () => {
        return (<div className="App">
            <Container>
                <Row xs={1}>
                    {userOrgs.map((e, i) => {
                        return (<Col>
                            <OrganizationCard userPermissionState={props.userPermissionState}
                                              name={e.organization.id}
                                              organization={e.organization.name} id={e.organization.id}
                                              reload={props.reload}
                                              permissionName={e.userType.name}/>
                        </Col>)
                    })}
                    <Col>
                        <div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
                            <NewOrganizationForm user={user} reload={props.reload}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }

    return (<div className="p-md-4">
            <h2 className="text-primary text-center text-uppercase py-md-4">
                Meine Organisationen
            </h2>
            <UserOrganizations/>
        </div>

    )

}
