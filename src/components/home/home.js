import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Row} from "react-bootstrap";
import './Home.css'

export default function HomeComponent(props) {
    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }
    return (<div>
            <header className="masthead">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 text-center">
                            <h1 className="fw-light text-secondary">Willkommen beim Event Join Control</h1>
                            <p className="lead text-white">Oder auch <a className="text-secondary">EvJoCo</a> -
                                dein Einlasssystem!</p>
                            {user ?
                                <div/>
                                : <>
                                    <Link to="/signup">
                                        <Button
                                            label="directoryButton"
                                            buttonstyle={{borderRadius: 25}}
                                            style={{borderRadius: 25}}
                                            labelcolor={'#FFFFFF'}
                                            backgroundcolor={"#0066e8"}>Registriere dich jetzt!</Button>
                                    </Link>
                                    <Row style={{marginTop: '4px'}}>
                                        <Link style={{textDecoration: 'none', color: 'orange'}} to="/login">
                                            Bereits angemeldet?
                                        </Link>
                                    </Row>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
