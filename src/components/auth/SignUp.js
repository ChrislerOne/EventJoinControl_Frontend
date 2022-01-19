import {Button, Form} from "react-bootstrap"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {toast} from "react-toastify";
import {postRegisterUser} from "../api/requests";

export default function SignUpComponent(props) {
    const auth = getAuth(props.app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const handleSignUp = () => {
        if (password === passwordRepeat) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                postRegisterUser(user);
                props.setUser(user);
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
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email"
                              placeholder="name@provider.de"
                              value={email}
                              onChange={(e) => {
                                  setEmail(e.target.value)
                              }}/>
                <Form.Text className="text-muted">
                    Deine E-Mail-Adresse wird ausschließlich für die Authentifizierung benutzt!
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password"
                              placeholder="Passwort"
                              value={password}
                              onChange={(e) => {
                                  setPassword((e.target.value))
                              }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Control type="password"
                              placeholder="Passwort wiederholen"
                              value={passwordRepeat}
                              onChange={(e) => {
                                  setPasswordRepeat((e.target.value))
                              }}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSignUp}>
                Los geht's!
            </Button>
        </Form>
    )
}
