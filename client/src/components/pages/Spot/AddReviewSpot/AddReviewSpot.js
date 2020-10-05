import React, { useState, useEffect } from "react";
import StarRatings from 'react-star-ratings';

import { updateSpot } from "../../../../services/spot"
import { updateUser } from "../../../../services/user"
import {createNotification} from "../../../../services/notifications"
import variables from "../../../../utils/base.scss"

import CloseIcon from "../../../../assets/cross.svg"
import './AddReviewSpot.scss'

const AddReviewSpot = (props) => {
    const [isModifyingReview, setIsModifyingReview] = useState(props.userAuth.reviews.filter(review => review.spot_id === props.spot._id).length > 0)
    const [content, setContent] = useState(isModifyingReview === true ? props.userAuth.reviews[props.userAuth.reviews.findIndex(review => review.spot_id === props.spot._id)].content : "");
    const [rating, setRating] = useState(isModifyingReview ? props.userAuth.reviews[props.userAuth.reviews.findIndex(review => review.spot_id === props.spot._id)].rate : 5);

    useEffect(() => { console.log("is modifying ", isModifyingReview) })

    const sendReview = async function () {
        console.log(isModifyingReview)
        let addReviewUser = props.userAuth;
        let addReviewSpot = props.spot;
        if (isModifyingReview) {
            let userReviewIndex = addReviewUser.reviews.findIndex(review => review.spot_id === props.spot._id)
            let spotReviewIndex = addReviewSpot.reviews.findIndex(review => review.user_id === props.userAuth._id)
            addReviewUser.reviews[userReviewIndex] = { spot_id: props.spot._id, rate: rating, content: content, timestamp: `${Date.now()}` }
            addReviewSpot.reviews[spotReviewIndex] = { user_id: props.userAuth._id, rate: rating, content: content, timestamp: `${Date.now()}` }
        } else {
            addReviewUser.reviews.push({ spot_id: props.spot._id, rate: rating, content: content, timestamp: `${Date.now()}` });
            addReviewSpot.reviews.push({ user_id: props.userAuth._id, rate: rating, content: content, timestamp: `${Date.now()}` });
        }
        let userResponse = await updateUser(addReviewUser, props.userAuth._id);
        let spotResponse = await updateSpot(addReviewSpot, props.spot._id);
        let notification = {
            targeted_user_id: props.spot.added_by,
            transmitter_user_id: props.userAuth._id,
            attachment: {
                spot_id: props.spot._id,
                spot_name: props.spot.name
            },
            libelle: "add_review",
            content: "à laissé un avis à votre spot",
        };
        createNotification(notification);
        props.onChangeAddReview(userResponse.data.user, spotResponse.data.spot)
        props.closeAddReview()
    }

    function changeRating(newRating) {
        console.log(newRating)
        setRating(newRating)
    }

    return (
        <div className="addReviewSpot__background">
            <div className="addReviewSpot__container">
                <img src={CloseIcon} onClick={() => { props.closeAddReview() }} className="addReviewSpot__closeButton colorToFilterBase" />
                <h1 className="addReviewSpot__title">{isModifyingReview ? "Modifier" : "Rédiger"} un avis</h1>
                <StarRatings
                    rating={rating}
                    starRatedColor={variables.baseColor2}
                    starHoverColor={variables.baseColor2}
                    changeRating={changeRating}
                    numberOfStars={5}
                    starDimension="20px"
                    name='rating'
                />
                <div className="inputsContainer">
                    <div className="inputAuthContainer">
                        <input onChange={(e) => { setContent(e.target.value) }} value={content} name="content" id="content" className="inputAuth" type="text" autoComplete="off" />
                        <label className="inputAuthLabel littleTextGrey">Votre avis</label>
                        <div className="inputAuthFocus"></div>
                    </div>
                </div>
                <button className="addReviewSpot__validateButton" onClick={() => { sendReview() }}>{isModifyingReview ? "Modifier" : "Valider"} l'avis</button>
            </div>
        </div>
    )
}

export default AddReviewSpot