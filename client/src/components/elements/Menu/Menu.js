import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { setMenuState } from "../../../actions/menuActions"
import { getNewNotificationsNumber } from "../../../services/notifications"

import Profile from "./Profile/Profile"
import Logo from "../../../assets/logo.svg"
import Close from "../../../assets/cross.svg"
import './Menu.scss'

const Menu = (props) => {

    const [notificationsNbr, setNotificationsNbr] = useState(0)

    useEffect(() => {

        async function fetchNotifications() {
            if (props.auth.isAuthenticated) {
                let notificationsNbrResponse = await getNewNotificationsNumber(props.auth.user._id);
                setNotificationsNbr(notificationsNbrResponse.data.notifications_number)
            }
        }

        fetchNotifications();
    })

    function changeRoute(route) {
        window.location.href = route
    }

    return (
        <div >
            <div className="Menu__container" style={{ transform: props.menu.isMenuOpened ? "translateX(0%)" : "translateX(-100%)" }}>
                <div className="Menu__topContainer">
                    <img src={Logo} className="Menu__logo colorToFilterBase" />
                    <button onClick={() => { props.setMenuState() }} className="Menu__closeButton ">FERMER <img src={Close} className="Menu__closeIcon colorToFilterBase" /></button>
                </div>
                <div className="Menu__optionsContainer">
                    {props.auth.isAuthenticated ?
                        <Profile auth={props.auth} />
                        :
                        <div className="Menu__option" onClick={() => { changeRoute("/addSpot") }}>Se connecter - S'inscrire</div>
                    }
                    <div className="Menu__option " onClick={() => { changeRoute("/") }}>Accueil</div>
                    <div className="Menu__option " onClick={() => { changeRoute("/notifications") }}>Notifications <div className="Menu__notificationsNbr">{notificationsNbr}</div></div>
                    <div className="Menu__option Menu__new" onClick={() => { changeRoute("/addSpot") }}>Ajouter un spot</div>
                    <div className="Menu__option Menu__beta" onClick={() => { changeRoute("/shopsAroundMe") }}>Shops autour de moi</div>
                    <div className="Menu__option " onClick={() => { changeRoute("/help") }}>Aide</div>
                </div>
            </div>
            <div className="Menu__mapOverlay" style={{ display: props.menu.isMenuOpened ? "inherit" : "none" }} onClick={() => { props.setMenuState() }}></div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    menu: state.menu
});

export default connect(
    mapStateToProps, { setMenuState }
)(Menu);
