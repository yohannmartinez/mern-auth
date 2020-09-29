import React from 'react'
import { connect } from "react-redux"

import { getDistanceSpot } from "../../../services/getDistanceSpot"
import { getAverageLikes } from "../../../services/getAverageLikes"
import "./SelectedSpot.scss"
import Distance from "../../../assets/distance.svg"
import Like from "../../../assets/like.svg"
import Dislike from "../../../assets/dislike.svg"
import Skatepark from "../../../assets/FormIcons/skatepark.svg"
import Street from "../../../assets/FormIcons/street.svg"
import Shop from "../../../assets/FormIcons/dollar.svg"
import rightArrow from "../../../assets/right-arrow.svg"

const selectedSpot = (props) => {
    console.log("selected spot is", props)
    let likesAverage = getAverageLikes(props.selectedSpot.liked_by.length, props.selectedSpot.disliked_by.length);
    let spotTypes = ["Skatepark", "Street Spot", "Shop"]
    return (
        <div className="selectedSpot__container">
            <h1 className="selectedSpot__title">{props.selectedSpot.name}</h1>

            <div className="selectedSpot__element">
                {props.selectedSpot.type === "0" && <img src={Skatepark} className="selectedSpot__icon colorToFilterBase" />}
                {props.selectedSpot.type === "1" && <img src={Street} className="selectedSpot__icon colorToFilterBase" />}
                {props.selectedSpot.type === "2" && <img src={Shop} className="selectedSpot__icon colorToFilterBase" />}
                {spotTypes[props.selectedSpot.type]} {props.selectedSpot.is_indoor ? "couvert" : "non couvert"}
            </div>

            <div className="selectedSpot__element"><img src={Distance} className="selectedSpot__icon colorToFilterBase" />Le spot se trouve à {getDistanceSpot(props.selectedSpot.longitude, props.selectedSpot.latitude, props.user_location[0], props.user_location[1], "K")} kilomètres de vous.</div>

            {props.selectedSpot.liked_by.length > 0 || props.selectedSpot.disliked_by.length > 0 ?
                <div className="selectedSpot__element">{likesAverage >= 50 ?
                    <img src={Like} className="selectedSpot__icon colorToFilterBase" /> : <img src={Dislike} className="selectedSpot__icon colorToFilterBase" />
                }{likesAverage}% des riders ont aimés ce spot ({props.selectedSpot.liked_by.length + props.selectedSpot.disliked_by.length} avis)
                </div> :
                <div className="selectedSpot__element">
                    <img src={Like} className="selectedSpot__icon colorToFilterBase" /> Aucun avis n'a été donné à ce spot !
                </div>
            }
            
            <button className="selectedSpot__button" onClick={()=>{window.location.href = "/spot/" + props.selectedSpot._id }}>En savoir plus <img src={rightArrow} className="selectedSpot__buttonIcon"/></button>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        selectedSpot: state.spot.selectedSpot
    }
}

export default connect(mapStateToProps, null)(selectedSpot)