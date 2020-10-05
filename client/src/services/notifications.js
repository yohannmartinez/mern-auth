import axios from "axios"

export const getNewNotificationsNumber = async (user_id) => {
    const resp = await axios.get('/api/notifications/getNewNotificationsNumber', { params: { user_id: user_id } });
    return resp
}

export const getNotifications = async (user_id) => {
    const resp = await axios.get('/api/notifications/getNotifications', { params: { user_id: user_id } });
    return resp
}

export const setNotificationsToChecked = async (user_id) => {
    const resp = await axios.post('/api/notifications/setNotificationsToChecked',{ user_id: user_id });
    return resp
}

export const createNotification = async (notification) => {
    const resp = await axios.post("/api/notifications/createOne", {
        targeted_user_id: notification.targeted_user_id,
        transmitter_user_id: notification.transmitter_user_id,
        attachment: notification.attachment,
        libelle: notification.libelle,
        content: notification.content,
        date: new Date().getTime(),
    })
    return resp
}

// export const createFollowNotification = async (notification) => {
//     const resp = await axios.post("/api/notifications/createFollowNotification", {
//         targeted_user_id: notification.targeted_user_id,
//         transmitter_user_id: notification.transmitter_user_id,
//         libelle: notification.libelle,
//         content: notification.content,
//         checked_status: false,
//         date: new Date().getTime(),
//     })
//     return resp
// }

// export const createLikeSpotNotification = async (notification) => {
//     const resp = await axios.post("/api/notifications/createLikeSpotNotification", {
//         targeted_user_id: notification.targeted_user_id,
//         transmitter_user_id: notification.transmitter_user_id,
//         libelle: notification.libelle,
//         content: notification.content,
//         checked_status: false,
//         date: new Date().getTime(),
//     })
//     return resp
// }

