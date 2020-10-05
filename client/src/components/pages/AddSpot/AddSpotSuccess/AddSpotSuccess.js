import React from "react"
import './AddSpotSuccess.scss'

import AddSpotIllustration from "../../../../assets/illustrations/addSpotSuccess.svg"
import Close from "../../../../assets/cross.svg"

class AddSpotSuccess extends React.Component {
    render() {
        return (
            <div className="addSpotSuccess__container">
                <button className="addSpotSuccess__close" onClick={()=>{window.location.href = "/"}}><img src={Close} className="addSpotSuccess__closeIcon colorToFilterBase"/></button>
                <img src={AddSpotIllustration} className="addSpotSuccess__illustration" />
                <h1 className="addSpotSuccess__text">Le spot "{new URLSearchParams(window.location.search).get('spot_name')}" a été ajouté avec succès, merci à vous !</h1>
                <button className="addSpotSuccess__button" onClick={()=>{window.location.href = "/spot/" + new URLSearchParams(window.location.search).get('spot_id')}}>Voir le Spot</button>
            </div>
        )
    }
}

export default AddSpotSuccess