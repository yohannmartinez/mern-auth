import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux";
import {setMenuState} from "../../../actions/menuActions"
import './SearchBar.scss';

//assets
import Menu from "../../../assets/menu.svg"

const SearchBar = (props) => {
    return (
        <div className="searchBar__container">
            <div className="searchBar__menuContainer" onClick={()=>{
                props.setMenuState("coucou")
            }}>
                <img src={Menu} className="searchBar__menuIcon" />
            </div>
            <input className="searchBar__input" placeholder="Trouver un Spot, un rider..."/>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    menu : state.menu
});

export default connect(
    mapStateToProps,
    {setMenuState}
)(SearchBar);