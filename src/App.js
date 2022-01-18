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

    const app = initializeApp(firebaseConfig)
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

    return (
        <>
            <NavbarComponent
                setUser={(user) => defineUser(user)}
                user={getParsedUser()}
                app={app}/>
            <Routes>
                <Route path="/"
                       element={<HomeComponent
                           setUser={(user) => defineUser(user)}
                           user={getParsedUser()}/>}/>
                <Route path="/login"
                       element={<LoginComponent
                           setUser={(user) => defineUser(user)}
                           user={getParsedUser()}
                           app={app}/>}/>
                <Route path="/signup"
                       element={<SignUpComponent
                           setUser={(user) => defineUser(user)}
                           user={getParsedUser()}
                           app={app}/>}/>
            </Routes>
        </>
    );
}

export default App;
