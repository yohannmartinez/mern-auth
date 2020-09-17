import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import Profile from "./Profile/Profile"

import './Menu.scss'

const Menu = (props) => {
    function changeRoute(route) {
        if(props.auth.isAuthenticated) {
            window.location.href = route
        } else {
            window.location.href = "/login"
        }
    }

    return (
        <div className="Menu__container" style={{transform : props.menu.isMenuOpened ? "translateX(0%)" : "translateX(-100%)"}}>
            <Profile auth={props.auth} />
            <div onClick={()=>{changeRoute("/addSpot")}}>Ajouter un spot</div>  
            <div onClick={()=>{changeRoute("/actus")}}>Actus</div>
            <div >Spots autour de moi</div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    menu: state.menu
});

export default connect(
    mapStateToProps,
)(Menu);
