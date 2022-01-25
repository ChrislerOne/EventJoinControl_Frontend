import {Button, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom';
import NewOrganizationForm from "./NewOrganizationForm";

export default function UserOrganizationsComponent(props) {
    let userOrgs;
    if (props.userPermissionState) {
        userOrgs = props.userPermissionState.filter(e => e.userType.name === 'owner')
    }
    const navigate = useNavigate();

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }


    const OrganizationCard = (props) => {
        const handleClick = (id) => {
            navigate('/organization/' + id)
        }

        return (<div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
            <h3 className="text-primary">{props.organization}</h3>
            <hr/>
            <Button variant="outline-primary" onClick={() => {
                handleClick(props.id)
            }}>Anzeigen</Button>
        </div>)
    }

    const UserOrganizations = () => {
        return (<div className="App">
            <Container>
                <Row xs={1}>
                    {userOrgs.map((e, i) => {
                        return (
                            <Col>
                                <OrganizationCard userPermissionState={props.userPermissionState}
                                                  name={e.organization.id}
                                                  organization={e.organization.name} id={e.organization.id}/>
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
