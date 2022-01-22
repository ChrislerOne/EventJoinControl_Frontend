import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRoute (props)  {
    let user = useSelector((state) => state.auth.value);

    return user
        ? <Outlet/>
        : <Navigate to="/"/>;
}
