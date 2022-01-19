import axios from "axios";

const baseURL = "http://127.0.0.1:8090/"

// GET REQUESTS
export const getUserStatus = (user) => {
    const url = baseURL + 'organizations/getStatus/?' + user.stsTokenManager.accessToken;
    let permission;
    axios.get(url).then((res) => {
        permission = res.data;
    })

    return permission;
}

// POST REQUESTS
export const postRegisterUser = (user) => {
    const url = baseURL + 'authentication/registerUser'
    const data = {
        "email": user.email,
        "idToken": user.stsTokenManager.accessToken
    }

    axios.post(url, data).then(() => {
        console.log('User erfolgreich auf Backend registriert!');
    }).then(() => {
            console.log("Registrierung auf Backend fehlgeschlagen!!");
        }
    )
}
