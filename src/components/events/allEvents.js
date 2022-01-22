import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deleteUserFromEvent, getAllEvents, getAllUserEvents, postAddUserToEvent} from "../api/requests";
import {useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {toast} from "react-toastify";

export default function AllEventsComponent(props) {
    const [allEvents, setAllEvents] = useState([])
    const [allUserEvents, setAllUserEvents] = useState([])
    const [render, setRender] = useState(false)

    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    useEffect(() => {
        if (user) {
            getAllEvents(user).then((r) => {
                if (r !== null) {
                    setAllEvents(r);
                }
            })
            getAllUserEvents(user).then((r) => {
                if (r !== null) {
                    console.log(r);
                    setAllUserEvents(r);
                }
            })
        }
    }, [render])

    const handleEnroll = (e) => {
        e.preventDefault();
        postAddUserToEvent(user, e.target.value).then(() => {
            let bool;
            bool = render !== true;
            setRender(bool);
            toast.success('Erfolgreich eingeschrieben!')
        }).catch((err) => {
            console.log(err);
            toast.error('Sorry, wir konnten dich nicht eintragen. Probiere es doch später erneut!')
        })
    }
    const handleDelist = (e) => {
        e.preventDefault();
        deleteUserFromEvent(user, e.target.value).then(() => {
            let bool;
            bool = render !== true;
            setRender(bool);
            toast.success('Erfolgreich ausgeschrieben!')
        }).catch((err) => {
            console.log(err);
            toast.error('Sorry, wir konnten dich nicht ausschreiben. Probiere es doch später erneut!')
        })
    }

    const EventCardComponent = (props) => {
        return (<div className="text-wrap shadow-sm p-3 mb-5 bg-light rounded">
            <h3 className="text-primary">{props.name}</h3>
            <h6 className="text-secondary">{props.organization}</h6>
            <hr/>
            {allUserEvents.filter(e => e.id === props.id).length === 0 ?
                <Button variant="outline-secondary" onClick={handleEnroll} value={props.id}>Einschreiben</Button>
                :
                <Button variant="outline-danger" onClick={handleDelist} value={props.id}>Austragen</Button>
            }
        </div>)
    }

    const AllEventCardComponent = () => {
        return (<div className="App">
            <Container>
                <Row xs={3}>
                    {allEvents.map((e, i) => {
                        return (<Col>
                            <EventCardComponent name={e.name} organization={e.organizationId.name} id={e.id}/>
                        </Col>)
                    })}
                </Row>
            </Container>
        </div>);
    }

    return (<div className="p-md-4">
            <h2 className="text-primary text-center text-uppercase py-md-4">
                Alle Veranstaltungen
            </h2>
            {allEvents.length !== 0 ?
                <AllEventCardComponent/>
                :
                <TailSpin
                    width="110"
                    height="110"
                    color='grey'
                    ariaLabel='loading'
                />}
        </div>

    )

}
