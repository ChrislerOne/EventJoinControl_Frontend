import axios from "axios";

const baseURL = "http://127.0.0.1:8090/"

// GET REQUESTS
export const getAllUserTypes = async (user) => {
    const url = baseURL + 'usertypes/list?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return await res.data;
}

export const getUserPermission = async (user) => {
    const url = baseURL + 'user/permissions?idToken=' + user.stsTokenManager.accessToken;
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

export const getAllOrganizations = async (user) => {
    const url = baseURL + 'organizations/list?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return res.data;
}


export const getAllEventsByOrganizationId = async (user, organizationId) => {
    const url = baseURL + 'events/getbyorganization?idToken=' + user.stsTokenManager.accessToken + '&organizationId=' + organizationId;
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

export const postAddEventToOrganization = async (user, name, organizationId, eventStart, eventEnd) => {
    const url = baseURL + 'events/add?idToken=' + user.stsTokenManager.accessToken;
    const data = {
        "name": name,
        "organizationid": organizationId,
        "eventstart": eventStart,
        "eventend": eventEnd
    }
    const res = await axios.post(url, data)
    return res.data;
}

export const postGrantPermissionForSpecificOrganization = async (user, email, organizationId, userTypeId) => {
    const url = baseURL + 'user/grantpermission?idToken=' + user.stsTokenManager.accessToken;
    const data = {
        "email": email,
        "organizationId": organizationId,
        "userTypeId": userTypeId
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

export const deleteEvent = async (user, eventId) => {
    const url = baseURL + 'events/delete?idToken=' + user.stsTokenManager.accessToken + "&eventId=" + eventId;
    const res = await axios.delete(url)
    return res.data;
}
