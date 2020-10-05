import React from "react"
import { connect } from "react-redux";
import { setMenuState } from "../../../actions/menuActions"
import { setSelectedSpot } from "../../../actions/spotActions"
import { getDistanceSpot } from "../../../services/getDistanceSpot"
import './SearchBar.scss';

//assets
import Menu from "../../../assets/menu.svg"
import Cross from "../../../assets/cross.svg"
import Skatepark from "../../../assets/FormIcons/skatepark.svg"
import Street from "../../../assets/FormIcons/street.svg"
import Shop from "../../../assets/FormIcons/dollar.svg"
import User from "../../../assets/user.svg"

const SearchBar = (props) => {



    return (
        <div className="searchBar__container">
            <div className="searchBar__menuContainer" onClick={() => {
                props.setMenuState()
            }}>
                <img src={Menu} />
            </div>
            <div className="searchBar__searchContainer">
                <input className="searchBar__input" name="search" value={props.search} onChange={(e) => { props.onChange(e); props.setSelectedSpot(null) }} autoComplete="off" placeholder="Trouver un Spot, un rider..." />
                <div className="searchBar__clearInput" onClick={() => { props.setSelectedSpot(null); props.onSelectSpot("") }}><img src={Cross} /></div>
                {props.search.length > 0 && !props.spot.selectedSpot &&
                    <div className="searchBar__searchResultsContainer">
                        {props.spotResults.length === 0 && props.userResults === 0 &&
                            "aucun resultat"
                        }
                        {props.spotResults.length > 0 &&
                            props.spotResults.slice(0, 5).map((spot, id) => (
                                <div key={"spot" + id} className="searchBar__searchResult" onClick={() => {
                                    props.setSelectedSpot(spot);
                                    props.onSelectSpot(spot.name)
                                }}>
                                    <div className="searchBar__searchResultName">
                                        {spot.type === "0" && <img src={Skatepark} className="searchBar__resultIcon colorToFilterBase" />}
                                        {spot.type === "1" && <img src={Street} className="searchBar__resultIcon colorToFilterBase" />}
                                        {spot.type === "2" && <img src={Shop} className="searchBar__resultIcon colorToFilterBase" />}
                                        <div>{spot.name}</div>
                                    </div>
                                    <div className="searchBar__searchResultDistance">{getDistanceSpot(spot.longitude, spot.latitude, props.mapCenter[0], props.mapCenter[1], "K")}km</div>
                                </div>
                            ))
                        }
                        {props.userResults.length > 0 &&
                            props.userResults.slice(0, 5).map((user, id) => (
                                <div key={"user" + id} className="searchBar__searchResult" onClick={() => {
                                    if (user._id === props.auth.user._id) {
                                        window.location.href = "/user/" + user._id
                                    } else {
                                        window.location.href = "/user/" + user._id
                                    }
                                }}>
                                    <div className="searchBar__searchResultName"><img src={User} className="searchBar__resultIcon" /> {user.username}</div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    menu: state.menu,
    spot: state.spot
});

export default connect(
    mapStateToProps,
    { setMenuState, setSelectedSpot }
)(SearchBar);