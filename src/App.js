import './App.css';
import {firebaseConfig} from "./configs/firebaseConfig";
import {initializeApp} from "firebase/app"
import {Routes, Route, Link} from "react-router-dom";
import HomeComponent from "./components/landingPage/Home"
import LoginComponent from "./components/auth/Login";
import React, {useEffect, useState} from "react";
import SignUpComponent from "./components/auth/SignUp";
import NavbarComponent from "./components/navigation/Navbar";

function App() {
    // GLOBAL STATES
    const [user, setUser] = useState(undefined)
    const [userPermissionState, setUserPermissionState] = useState(undefined)

    // FIREBASE
    const app = initializeApp(firebaseConfig)

    // STATE RELATED FUNCTIONS
    const defineUser = (user) => {
        setUser(JSON.stringify(user));
    }

    const getParsedUser = () => {
        if (user) {
            return JSON.parse(user)
        } else {
            return undefined
        }
    }

    const defineUserPermissionState = (userPermissionState) => {
        setUserPermissionState(JSON.stringify(userPermissionState));
    }


    return (<>
        <NavbarComponent
            setUser={(user) => defineUser(user)}
            user={getParsedUser()}
            app={app}
            setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
            userPermissionState={userPermissionState}/>
        <Routes>
            <Route path="/"
                   element={<HomeComponent
                       setUser={(user) => defineUser(user)}
                       user={getParsedUser()}
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={userPermissionState}/>}/>
            <Route path="/login"
                   element={<LoginComponent
                       setUser={(user) => defineUser(user)}
                       user={getParsedUser()}
                       app={app}
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={userPermissionState}/>}/>
            <Route path="/signup"
                   element={<SignUpComponent
                       setUser={(user) => defineUser(user)}
                       user={getParsedUser()}
                       app={app}
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={userPermissionState}/>}/>
        </Routes>
    </>);
}

export default App;
