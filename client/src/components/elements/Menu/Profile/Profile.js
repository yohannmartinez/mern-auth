import React from "react"

import UserIcon from "../../../../assets/user.svg"

import './Profile.scss';

const Profile = (props) => {
    return (
        <div className="profile__container" onClick={() => {
            if (props.auth.isAuthenticated) {
                window.location.href = "/profile"
            } else {
                window.location.href = "/login"
            }
        }}>
            <div className="profile__circle" >
                <img src={UserIcon} className="profile__icon" />
            </div>
            <span>{props.auth.isAuthenticated ? props.auth.user.username : "Créer un compte"}</span>
        </div>
    )
}

export default Profile