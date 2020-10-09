import React from "react"
import { connect } from "react-redux"
import StarRatings from 'react-star-ratings';
import variables from "../../../utils/base.scss"

import { getSpotById } from "../../../services/spot"
import { getUserById } from "../../../services/user"
import { getTimeElapsed } from "../../../services/getTimeElapsed"
import { setSelectedSpot } from "../../../actions/spotActions"
import { likeOrDislikeSpot } from "../../../services/likeOrDislikeSpot"
import AddReviewSpot from "./AddReviewSpot/AddReviewSpot"
import Map from "../../elements/Map/Map"
import Like from "../../../assets/like.svg"
import Dislike from "../../../assets/dislike.svg"
import ValidIcon from "../../../assets/valid.svg"
import ReviewIcon from "../../../assets/review.svg"
import NotFound from "../../../assets/notfound.svg"

import InformationIcon from "../../../assets/information.svg"
import SizeIcon from "../../../assets/size.svg"
import PinIcon from "../../../assets/pin.svg"
import Skatepark from "../../../assets/FormIcons/skatepark.svg"
import Street from "../../../assets/FormIcons/street.svg"
import Shop from "../../../assets/FormIcons/dollar.svg"


import './Spot.scss'
import Navbar from "../../elements/Navbar/Navbar"

class Spot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spot: null,
            spotCreator: null,
            userAuth: null,
            loading: true,

            addReview: false,
            reviewUsers: [],

            spotSizes: ['petite', "moyenne", "grande"],
            spotIcons: [Skatepark, Street, Shop],
            spotTypes: ["Skatepark", "Street spot", "Shop"]
        }
        this.LikeOrDislikeSpot = this.LikeOrDislikeSpot.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeAddReview = this.onChangeAddReview.bind(this)
    }

    async componentDidMount() {
        console.log("rerender")
        let spot_id = window.location.pathname.split('/')[2].replace("%20", "");
        let spotResponse = await getSpotById(spot_id);
        console.log(spotResponse)
        if (spotResponse.data.spot) {
            let creatorResponse = await getUserById(spotResponse.data.spot[0].added_by)
            let userAuth = await getUserById(this.props.auth.user._id)
            let reviewsUsers = await Promise.all(spotResponse.data.spot[0].reviews.map(review => getUserById(review.user_id)))
            reviewsUsers.map((reviewUser, index) => reviewsUsers[index] = reviewUser.data.user)
            this.setState({ loading: false, spot: spotResponse.data.spot[0], spotCreator: creatorResponse.data.user, userAuth: userAuth.data.user, reviewUsers: reviewsUsers })
        } else {
            this.setState({ spot: null, loading: false })
        }

    }

    async LikeOrDislikeSpot(likeStatus) {
        if (!this.props.auth.isAuthenticated) {
            window.location.href = "/login"
        } else {
            let response = await likeOrDislikeSpot(likeStatus, this.state.spot, this.state.userAuth);
            this.setState({ spot: response.spot, userAuth: response.user })
        }

    }

    onChange(e) {
        let review = this.state.review;
        review[e.target.name] = e.target.value;
        this.setState({ review: review }, () => { console.log(this.state) })
    }

    onChangeAddReview(userAuth, spot) {
        let reviewUsers = this.state.reviewUsers;
        reviewUsers.push(userAuth)
        console.log(reviewUsers)
        this.setState({ reviewUsers: reviewUsers, userAuth: userAuth, spot: spot, })
    }



    render() {
        console.log("render again")
        return (
            <div className="spot__globalContainer">
                <Navbar />
                {this.state.loading ? "Chargement" : <React.Fragment>
                    {this.state.spot ?
                        <div className="spot__contentContainer" onClick={() => {
                            console.log(this.state)
                        }}>
                            <div className="spot__leftContainer">
                                <div className="spot__mapContainer">
                                    <Map user_location={[this.state.spot.longitude, this.state.spot.latitude]} map_zoom={15} addControl={true} spots={[this.state.spot]} />

                                </div>
                                <h1 className="spot__spotName">{this.state.spot.name}</h1>
                                <div className="spot__flexContainer" id="informationsContainer">
                                    <p>Ajouté le {new Date(this.state.spot.added_timestamp).toLocaleDateString()} par <b style={{ cursor: "pointer" }} onClick={() => {
                                        window.location.href = "/user/" + this.state.spot.added_by
                                    }}>{this.state.spotCreator.username}</b></p>
                                    <div className="spot__flexContainer" id="likesButtonContainer">
                                        <button className="spot__likeButton" onClick={() => { this.LikeOrDislikeSpot('like') }} style={{ filter: this.state.userAuth && this.state.spot.liked_by.includes(this.state.userAuth._id) ? "invert(11%) sepia(9%) saturate(3686%) hue-rotate(203deg) brightness(94%) contrast(85%)" : "invert(73%) sepia(3%) saturate(4%) hue-rotate(332deg) brightness(95%) contrast(84%)" }}><img src={Like} className="spot__likeButton__icon" /> {this.state.spot.liked_by.length}</button>
                                        <button className="spot__likeButton" onClick={() => { this.LikeOrDislikeSpot('dislike') }} style={{ filter: this.state.userAuth && this.state.spot.disliked_by.includes(this.state.userAuth._id) ? " invert(11%) sepia(9%) saturate(3686%) hue-rotate(203deg) brightness(94%) contrast(85%)" : "invert(73%) sepia(3%) saturate(4%) hue-rotate(332deg) brightness(95%) contrast(84%)" }}><img src={Dislike} className="spot__likeButton__icon" /> {this.state.spot.disliked_by.length}</button>
                                    </div>
                                </div>
                                <div className="spot__descriptionContainer">
                                    <h3 className="spot__subTitle">Description</h3>
                                    <div className="spot__descriptionFlexContainer"><img src={InformationIcon} className="spot__descriptionIcon colorToFilterBase" /><p className="spot__descriptionText">{this.state.spot.description}</p></div>
                                    <div className="spot__descriptionFlexContainer"><img src={SizeIcon} className="spot__descriptionIcon colorToFilterBase" /><p className="spot__descriptionText">Le spot est de {this.state.spotSizes[this.state.spot.size]} taille</p></div>
                                    <div className="spot__descriptionFlexContainer"><img src={this.state.spotIcons[this.state.spot.type]} className="spot__descriptionIcon colorToFilterBase" /><p className="spot__descriptionText">{this.state.spotTypes[this.state.spot.type]} {this.state.spot.is_indoor ? "couvert" : "pas couvert"} </p></div>
                                </div>
                                <div className="spot__reviewsContainer">

                                    <h3 className="spot__subTitle">Avis ({this.state.spot.reviews.length})</h3>
                                    {this.state.userAuth ?
                                        <React.Fragment>
                                            {this.state.spot.reviews.filter(review => review.user_id === this.state.userAuth._id).length === 0 ?
                                                <div className="spot__reviewNotAdded">
                                                    <img src={ReviewIcon} className="spot__reviewCheckIcon" style={{ filter: "invert(100%)" }} />
                                                    <span className="spot__reviewCheckText">Votre avis compte, dites-nous ce que vous pensez !</span>
                                                    <button className="spot__reviewNotAdded__button" onClick={() => { this.setState({ addReview: true }) }}>Laisser un avis</button>
                                                </div>
                                                :
                                                <div className="spot__reviewAdded">
                                                    <img src={ValidIcon} className="spot__reviewCheckIcon" />
                                                    <span className="spot__reviewCheckText">Merci d'avoir laissé votre avis !</span>
                                                    <button className="spot__reviewAdded__button" onClick={() => { this.setState({ addReview: true }) }}>Modifier</button>
                                                </div>
                                            }
                                        </React.Fragment>
                                        : <div className="spot__reviewNotAdded">
                                            <img src={ReviewIcon} className="spot__reviewCheckIcon" style={{ filter: "invert(100%)" }} />
                                            <span className="spot__reviewCheckText">Votre avis compte, dites-nous ce que vous pensez !</span>
                                            <button className="spot__reviewNotAdded__button" onClick={() => { window.location.href = "/login" }}>Laisser un avis</button>
                                        </div>}

                                    {this.state.addReview === true &&
                                        <AddReviewSpot userAuth={this.state.userAuth} spot={this.state.spot} onChangeAddReview={this.onChangeAddReview} closeAddReview={() => { this.setState({ addReview: false }) }} />
                                    }

                                    {this.state.spot.reviews.map((review, index) => (
                                        <div className="spot__reviewContainer">
                                            <div className="spot__reviewEmitterContainer" onClick={() => { window.location.href = "/user/" + review.user_id }}>
                                                <div className="spot__reviewEmitterAvatar" style={{ backgroundImage: `url('${this.state.reviewUsers[index].avatar}')` }}></div>
                                                <span className="spot__reviewEmitterUsername">{this.state.reviewUsers[index].username} </span>
                                                <span className="spot__reviewEmitterDate">il y a {getTimeElapsed(Number(review.timestamp))}</span>
                                            </div>
                                            <StarRatings
                                                rating={review.rate}
                                                starRatedColor={variables.baseColor2}
                                                numberOfStars={5}
                                                starDimension="15px"
                                                starSpacing="5px"
                                            />
                                            <span className="spot__reviewContent">{review.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="spot__rightContainer">
                                <div className="spot__spotCreatorContainer" onClick={() => { window.location.href = "/user/" + this.state.spotCreator._id }}>
                                    <div style={{ backgroundImage: `url('${this.state.spotCreator.avatar}')` }} className="spot__spotCreatorAvatar" ></div>
                                    <span className="spot__spotCreatorText">spot créé par</span>
                                    <span className="spot__spotCreatorUsername">{this.state.spotCreator.username}</span>
                                </div>
                            </div>
                        </div> : <div className="spot__spotNotFoundContainer">
                            <img src={NotFound} className="spot__spotNotFoundImage" />
                            <p className="spot__spotNotFoundText">Oops, le spot que vous cherchez n'existe pas ou a peut-être été supprimé</p>
                        </div>
                    }
                </React.Fragment>}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { setSelectedSpot })(Spot)