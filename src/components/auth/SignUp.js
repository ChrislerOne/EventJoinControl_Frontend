import {Button, Col, Form, Row} from "react-bootstrap"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useState} from "react";
import {toast} from "react-toastify";
import {getUserPermission, postRegisterUser} from "../api/requests";
import {useNavigate} from "react-router-dom";

export default function SignUpComponent(props) {
    const auth = getAuth(props.app)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [displayName, setDisplayName] = useState("")


    const handleSignUp = (e) => {
        e.preventDefault();
        if (password === passwordRepeat) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                if (displayName !== '') {
                    updateProfile(user, {displayName: displayName}).then(() => {
                        toast.success('Dein Name wurde geändert!')
                    })
                }
                // DB Eintrag in die DB + initiale QR-Code Generierung.
                postRegisterUser(user).then((r) => {
                    getUserPermission(user).then((r) => {
                        props.setUserPermissionState(r.data);
                    })
                    navigate('/user')
                });
            }).catch((error) => {
                console.log(error);
            })
        } else {
            toast.warn('Die Passwörter stimmen nicht überein! Bitte wiederholen!')
            setPassword('')
            setPasswordRepeat('')
        }
    }

    return (
        <Form onSubmit={handleSignUp} className="my-3 mx-4">
            <Row>
                <Col>
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email"
                                      required={true}
                                      placeholder="name@provider.de"
                                      value={email}
                                      onChange={(e) => {
                                          setEmail(e.target.value)
                                      }}/>
                        <Form.Text className="text-muted">
                            Deine E-Mail-Adresse wird ausschließlich für die Authentifizierung benutzt!
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicDisplayName">
                        <Form.Control type="text"
                                      required={false}
                                      placeholder="Wie sollen wir dich nennne?"
                                      value={displayName}
                                      onChange={(e) => {
                                          setDisplayName(e.target.value)
                                      }}/>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Label>Passwort</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password"
                              required={true}
                              placeholder="Passwort"
                              value={password}
                              onChange={(e) => {
                                  setPassword((e.target.value))
                              }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Control type="password"
                              required={true}
                              placeholder="Passwort wiederholen"
                              value={passwordRepeat}
                              onChange={(e) => {
                                  setPasswordRepeat((e.target.value))
                              }}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Los geht's!
            </Button>
        </Form>
    )
}
