import {Button, Form} from "react-bootstrap"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginComponent(props) {
    const auth = getAuth(props.app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            props.setUser(user);
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                    <Form>
                        <h5>Willkommen zurück!</h5>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email"
                                          placeholder="name@provider.de"
                                          value={email}
                                          onChange={(e) => {
                                              setEmail(e.target.value)
                                          }}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password"
                                          placeholder="Passwort"
                                          value={password}
                                          onChange={(e) => {
                                              setPassword((e.target.value))
                                          }}/>
                        </Form.Group>
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
