import './App.css';
import {Routes, Route} from "react-router-dom";
import HomeComponent from "./components/landingPage/Home"
import LoginComponent from "./components/auth/Login";
import React, {useEffect, useState} from "react";
import SignUpComponent from "./components/auth/SignUp";
import NavbarComponent from "./components/navigation/Navbar";
import UserComponent from "./components/user/User";
import OrganizationComponent from "./components/organization/Organization";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "./utils/store/authSlice";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import {getUserType} from "./components/api/requests";
import AllEventsComponent from "./components/events/allEvents";

function App(props) {
    // GLOBAL STATES
    const [userPermissionState, setUserPermissionState] = useState(undefined)
    const [reloadUser, setReloadUser] = useState(false);

    // Redux
    const dispatch = useDispatch()
    let user = useSelector((state) => state.auth.value);
    if (user) {
        user = JSON.parse(user);
    }

    // Firebase
    const auth = getAuth();
    const app = props.app;

    // Firebase Login to React-Redux-Store
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(saveUser(JSON.stringify(user)));
            } else {
                dispatch(saveUser(undefined));
            }
        });
    }, [auth, dispatch, reloadUser]);

    // STATE RELATED FUNCTIONS
    const defineUserPermissionState = (userPermissionState) => {
        setUserPermissionState(JSON.stringify(userPermissionState));
    }

    const getParsedUserPermissionState = () => {
        if (userPermissionState !== undefined) {
            return JSON.parse(userPermissionState)
        } else {
            return undefined
        }
    }

    useEffect(() => {
        console.log(user);
        if (user) {
            getUserType(user).then((r) => {
                setUserPermissionState(JSON.stringify(r));
            })
        }
    }, [user])


    return (<>
        <NavbarComponent
            app={app}
            setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
            userPermissionState={getParsedUserPermissionState()}/>
        <Routes>
            <Route path="/"
                   element={<HomeComponent
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={getParsedUserPermissionState()}/>}/>
            <Route path="/login"
                   element={<LoginComponent
                       app={app}
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={getParsedUserPermissionState()}/>}/>
            <Route path="/signup"
                   element={<SignUpComponent
                       app={app}
                       setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                       userPermissionState={getParsedUserPermissionState()}/>}/>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route path="/user"
                       element={<UserComponent
                           setReloadUser={(bool) => setReloadUser(bool)}
                           reloadUser={reloadUser}
                           app={app}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
                <Route path="/organization"
                       element={<OrganizationComponent
                           app={app}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
                <Route path="/events"
                       element={<AllEventsComponent
                           app={app}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
            </Route>
        </Routes>
    </>);
}

export default App;
