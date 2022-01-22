import axios from "axios";

const baseURL = "http://127.0.0.1:8090/"

// GET REQUESTS
export const getUserType = async (user) => {
    const url = baseURL + 'usertype/get?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return await res.data;
}

export const getQrCode = async (user) => {
    const url = baseURL + 'qrcode/get?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return res.data;
}

export const getAllUserEvents = async (user) => {
    const url = baseURL + 'user/getevents?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return res.data;
}

export const getAllEvents = async (user) => {
    const url = baseURL + 'events/list?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return res.data;
}


// POST REQUESTS
export const postRegisterUser = async (user) => {
    const url = baseURL + 'authentication/registerUser'
    const data = {
        "email": user.email, "idToken": user.stsTokenManager.accessToken
    }
    const res = await axios.post(url, data)
    return res.data;
}

export const postAddUserToEvent = async (user, eventId) => {
    const url = baseURL + 'user/addtoevent?idToken=' + user.stsTokenManager.accessToken;
    const data = {
        "eventid": eventId
    }
    const res = await axios.post(url, data)
    return res.data;
}

// DELETE REQUESTS
export const deleteUserFromEvent = async (user, eventId) => {
    const url = baseURL + 'user/deleteFromEvent?idToken=' + user.stsTokenManager.accessToken;
    const config = {
        data: {"eventid": eventId}
    }
    const res = await axios.delete(url, config)
    return res.data;
}
