import axios from "axios";

// LOKAL
const baseURL = "http://127.0.0.1:8090/"

// LIVE
// const baseURL = "https://ejc-api.xn--fd-fkaa.de/"

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

export const getUserByIdToken = async (user) => {
    const url = baseURL + 'user/getByIdToken?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.get(url);
    return res.data;
}

export const getStatusByToken = async (qrCode) => {
    const url = baseURL + 'getStatus/' + qrCode
    const res = await axios.get(url);
    return res.data;
}

export const getUsersByOrganization = async (user, organizationId) => {
    const url = baseURL + 'organization/user/list?idToken=' + user.stsTokenManager.accessToken + '&organizationid=' + organizationId
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

export const postCreateOrganization = async (user, name, description) => {
    const url = baseURL + 'organizations/add?idToken=' + user.stsTokenManager.accessToken;
    const data = {
        "name": name,
        "description": description
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

export const postReportCoronaPositive = async (user) => {
    const url = baseURL + 'user/positiveuser?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.post(url)
    return res.data;
}

export const postRefreshState = async (user) => {
    const url = baseURL + 'user/refreshstatus?idToken=' + user.stsTokenManager.accessToken;
    const res = await axios.post(url)
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


export const deleteOrganization = async (user, organizationId) => {
    const url = baseURL + 'organizations/delete?idToken=' + user.stsTokenManager.accessToken + "&organizationid=" + organizationId;
    const res = await axios.delete(url)
    return res.data;
}


export const revokePermissionFromUser = async (user, orgausertypeid) => {
    const url = baseURL + 'user/revokeOrganizationPermission?idToken=' + user.stsTokenManager.accessToken + "&orgausertypeid=" + orgausertypeid;
    const res = await axios.delete(url)
    return res.data;
}
