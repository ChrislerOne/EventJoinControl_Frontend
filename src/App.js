import {Routes, Route, Link} from "react-router-dom";
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
import {getAllOrganizations, getUserPermission} from "./components/api/requests";
import AllEventsComponent from "./components/events/allEvents";
import UserEventsComponent from "./components/events/userEvents";
import UserOrganizationsComponent from "./components/organization/UserOrganizations";
import QrCodeCheckComponent from "./components/qr/checkQrCode";

function App(props) {
    // GLOBAL STATES
    const [userPermissionState, setUserPermissionState] = useState()
    const [reloadUser, setReloadUser] = useState(false);
    const [render, setRender] = useState(false);
    const [organziations, setOrganizations] = useState([{'id': 1}]);


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
                getAllOrganizations(user).then((r) => {
                    setOrganizations(r);
                }).catch((err) => {
                    console.log(err);
                })
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
        if (user) {
            getUserPermission(user).then((r) => {
                setUserPermissionState(JSON.stringify(r));
            })
        }
    }, [user, render])


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
            <Route path="/checkQrCode/:qrCode"
                   element={<QrCodeCheckComponent
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
                <Route path="/organizations"
                       element={<UserOrganizationsComponent
                           app={app}
                           reload={() => {
                               let bool = render === false;
                               setRender(bool);
                           }}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
                <Route path="/organization/:organizationId"
                       element={<OrganizationComponent
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
                <Route path="/events"
                       element={<AllEventsComponent
                           app={app}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
                <Route path="/user/events"
                       element={<UserEventsComponent
                           app={app}
                           setUserPermissionState={(userPermissionState) => defineUserPermissionState(userPermissionState)}
                           userPermissionState={getParsedUserPermissionState()}/>}/>
            </Route>
        </Routes>
    </>);
}

export default App;
