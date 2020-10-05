import axios from "axios"
import { createNotification } from "./notifications"


export const getUserById = async (user_id) => {
    const resp = await axios.get('/api/users/getById', { params: { user_id: user_id } });
    return resp
}

export const updateUser = async (user, user_id) => {
    const resp = await axios.post('/api/users/updateUser', { user: user, user_id: user_id });
    return resp
}

export const followUser = async (user_id, user_followed_id) => {
    const followResponse = await axios.post('/api/users/followUser', { user_id, user_followed_id });
    let notification = {
        targeted_user_id: user_followed_id,
        transmitter_user_id: user_id,
        attachment: {},
        libelle: "follow",
        content: "vous suit",
    };
    let notificationsResponse = await createNotification(notification);
    return notificationsResponse
}

export const unfollowUser = async (user_id, user_followed_id) => {
    const resp = await axios.post('/api/users/unfollowUser', { user_id, user_followed_id });
    return resp
}

export const changeEmail = async (email, confirmEmail, oldEmail, user_id) => {
    const resp = await axios.post('/api/users/changeEmail', { email: email, confirmEmail: confirmEmail, oldEmail: oldEmail, user_id: user_id })
    return resp
}

export const changePassword = async (oldPassword, newPassword, confirmPassword, user_id, email) => {
    const resp = await axios.post('/api/users/changePassword', { oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword, user_id: user_id, email: email })
    return resp
}

export const followOrUnfollow = (user_following, user_followed) => {
    let user = user_followed;
    if (user_following.isAuthenticated && !user_followed.followers.includes(user_following.user._id)) {
        followUser(user_following.user._id, user_followed._id)
        return
    } else if (user_following.isAuthenticated && user_followed.followers.includes(user_following.user._id)) {
        unfollowUser(user_following.user._id, user_followed._id)
        return
    } else {
        window.location.href = "/login"
    }
    return user
}