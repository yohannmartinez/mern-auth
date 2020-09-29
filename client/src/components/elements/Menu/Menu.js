import React from "react"
import { connect } from "react-redux"
import {setMenuState} from "../../../actions/menuActions"

import Profile from "./Profile/Profile"

import './Menu.scss'

const Menu = (props) => {
    function changeRoute(route) {
        if (props.auth.isAuthenticated) {
            window.location.href = route
        } else {
            window.location.href = "/login"
        }
    }

    return (
        <div >
            <div className="Menu__container" style={{ transform: props.menu.isMenuOpened ? "translateX(0%)" : "translateX(-100%)" }}>
                <Profile auth={props.auth} />
                <div onClick={() => { changeRoute("/addSpot") }}>Ajouter un spot</div>
                <div onClick={() => { changeRoute("/actus") }}>Actus</div>
                <div >Spots autour de moi</div>

            </div>
            <div className="Menu__mapOverlay" style={{ display: props.menu.isMenuOpened ? "inherit" : "none" }} onClick={()=>{props.setMenuState()}}></div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    menu: state.menu
});

export default connect(
    mapStateToProps,{setMenuState}
)(Menu);
