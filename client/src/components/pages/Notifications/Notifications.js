import React from 'react'
import { connect } from "react-redux"
import Navbar from "../../elements/Navbar/Navbar"
import "./Notifications.scss"
import { getNotifications, setNotificationsToChecked } from "../../../services/notifications"
import { getUserById } from "../../../services/user"
import { getTimeElapsed } from "../../../services/getTimeElapsed"

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        }
    }

    async componentDidMount() {
        let notifications = await getNotifications(this.props.auth.user._id);
        let notificationCheck = await setNotificationsToChecked(this.props.auth.user._id);
        notifications = notifications.data.notifications.sort((a, b) => { return Number(b.date) - Number(a.date) }).slice(0, 20)
        let transmitters = await Promise.all(notifications.map(notification => getUserById(notification.transmitter_user_id)))
        transmitters.map((transmitter, index) => transmitters[index] = transmitter.data.user)
        this.setState({ notifications: notifications, transmitters: transmitters }, () => { console.log(this.state) })
    }


    render() {
        return (
            <div className="notifications__globalContainer">
                <Navbar />
                <div className="notifications__container">
                    <h1 className="notifications__title">Notifications</h1>
                    {this.state.notifications.length > 0 && this.state.notifications.map((notification, index) => (
                        <div className="notifications__notification" onClick={() => {
                            if (notification.libelle === "follow") { window.location.href = "/user/" + notification.transmitter_user_id }
                            else if (notification.libelle === "like/dislike" || notification.libelle === "add_spot" || notification.libelle === "add_review") { window.location.href = "/spot/" + notification.attachment.spot_id }
                        }}>
                            {notification.checked_status === false && <div className="notifications__newNotif"></div>}
                            <div className="notifications__transmitterAvatar" style={{ backgroundImage: `url('${this.state.transmitters[index].avatar}')` }}></div>
                            <div className="notifications__content">
                                <span className="notifications__transmitterName">{this.state.transmitters[index].username}</span>
                                {notification.libelle === "like/dislike" && <span> {notification.content} {notification.attachment.spot_name}</span>}
                                {notification.libelle === "follow" && <span> {notification.content}</span>}
                                {notification.libelle === "add_spot" && <span> {notification.content}</span>}
                                {notification.libelle === "add_review" && <span> {notification.content}</span>}
                            </div>
                            <span className="notifications__date">{getTimeElapsed(Number(notification.date))}</span>
                        </div>
                    ))}

                    {this.state.notifications.length === 0 &&
                        <div className="notifications__noNotification">Vous n'avez pas de notifications pour le moment, suivez des comtpes pour rester à l'actu des nouveaux spots !</div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Notifications)