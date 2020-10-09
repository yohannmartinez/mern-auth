import React from "react"
import { connect } from "react-redux"
import Logo from "../../../assets/logo.svg"
import MenuIcon from "../../../assets/menu.svg"
import { setMenuState } from "../../../actions/menuActions"
import './Navbar.scss'

const Navbar = (props) => {
    return (
        <div className="navbar__container">
            <div className="navbar__menuContainer" onClick={() => { props.setMenuState() }}><img src={MenuIcon} className="navbar__menuIcon" /><span className="navbar__menuText">Menu</span></div>
            <img src={Logo} className="colorToFilterBase navbar__logo" onClick={()=>{window.location.href = "/"}}/>
            {props.auth.isAuthenticated ?
                <div onClick={()=>{window.location.href = "/user/" + props.auth.user._id}} className="navbar__actionsContainer"><span className="navbar__actionsText">{props.auth.user.username}</span><div className="navbar__userIcon" style={{backgroundImage: `url('${props.auth.user.avatar}')`}}></div></div>
                :
                <div onClick={()=>{window.location.href = "/login"}} className="navbar__actionsContainer"><span className="navbar__actionsText">S'inscrire / Se connecter</span><div className="navbar__userIcon" id="notConnectedIcon" style={{backgroundImage: "url('https://mispotsbucket.s3.eu-west-3.amazonaws.com/emptyuserphoto.png')"}}></div></div>
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