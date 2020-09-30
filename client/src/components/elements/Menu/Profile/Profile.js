import React from "react"

import UserIcon from "../../../../assets/user.svg"

import './Profile.scss';

const Profile = (props) => {
    return (
        <div className="profile__container" onClick={() => { window.location.href = "/user/" + props.auth.user._id }}>
            <div className="profile__circle" style={{ backgroundImage: `url('${props.auth.user.avatar}')` }}></div>
            <div>{props.auth.user.username}</div>
        </div>
    )
}

export default Profile