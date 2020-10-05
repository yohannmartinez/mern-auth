import React from "react"
import { connect } from "react-redux"
import Logo from "../../../assets/logo.svg"
import MenuIcon from "../../../assets/menu.svg"
import { setMenuState } from "../../../actions/menuActions"
import './Navbar.scss'

const Navbar = (props) => {
    return (
        <div className="navbar__container">
            <div className="navbar__menuContainer" onClick={() => { props.setMenuState() }}><img src={MenuIcon} className="navbar__menuIcon" />Menu</div>
            <img src={Logo} className="colorToFilterBase navbar__logo" onClick={()=>{window.location.href = "/"}}/>
            {props.auth.isAuthenticated ?
                <div onClick={()=>{window.location.href = "/user/" + props.auth.user._id}} className="navbar__actionsContainer">{props.auth.user.username}<div className="navbar__userIcon" style={{backgroundImage: `url('${props.auth.user.avatar}')`}}></div></div>
                :
                <div onClick={()=>{window.location.href = "/login"}} className="navbar__actionsContainer">S'inscrire / Se connecter</div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        menu: state.menu
    }
}

export default connect(mapStateToProps, { setMenuState })(Navbar)