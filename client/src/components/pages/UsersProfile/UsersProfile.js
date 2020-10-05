import React from "react"
import { connect } from "react-redux"

import EditAvatar from "./EditAvatar/EditAvatar"

import { getUserById, followUser, unfollowUser } from "../../../services/user"
import { getAddedSpotsByUserId, getSpotById } from "../../../services/spot"
import { getTimeElapsed } from "../../../services/getTimeElapsed"
import StarRatings from 'react-star-ratings';
import { logoutUser } from "../../../actions/authActions";
import variables from "../../../utils/base.scss"
import Skatepark from "../../../assets/markers/skateparkMarker.svg"
import Street from "../../../assets/markers/streetMarker.svg"
import Shop from "../../../assets/markers/shopMarker.svg"

import './UsersProfile.scss'
import Navbar from "../../elements/Navbar/Navbar"

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            added_spots: null,
            editAvatar: false,
            reviewsSpots: null,

            rightStatus: "added_spots",
            iconsTypes: [Skatepark, Street, Shop],
            spotFeatures: {
                size: ['petite taille', 'taille moyenne', "grande taille"],
                type: ['Skatepark', 'Street spot', 'Shop']
            },
        }
        this.followOrUnfollow = this.followOrUnfollow.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    async componentDidMount() {
        let user_id = window.location.pathname.split('/')[2].replace("%20", "");
        let user = await getUserById(user_id)
        let added_spots = await getAddedSpotsByUserId(user_id)
        let reviewsSpots = await Promise.all(user.data.user.reviews.map(review => getSpotById(review.spot_id)));
        reviewsSpots.map((reviewsSpot, index) => reviewsSpots[index] = reviewsSpot.data.spot[0])

        this.setState({ user: user.data.user, added_spots: added_spots.data.spots, reviewsSpots: reviewsSpots }, () => {
            console.log(this.state)
        })
    }

    followOrUnfollow() {
        if (this.props.auth.isAuthenticated && !this.state.user.followers.includes(this.props.auth.user._id)) {
            followUser(this.props.auth.user._id, this.state.user._id)
            let user = this.state.user;
            user.followers.push(this.props.auth.user._id)
            this.setState({ user: user })
        } else if (this.props.auth.isAuthenticated && this.state.user.followers.includes(this.props.auth.user._id)) {
            unfollowUser(this.props.auth.user._id, this.state.user._id)
            let user = this.state.user;
            user.followers.splice(this.state.user.followers.indexOf(this.props.auth.user._id), 1)
            this.setState({ user: user })
        } else {
            window.location.href = "/login"
        }
    }

    changeUser(user) {
        console.log(user);
    }


    render() {
        return (
            <div className="user__globalContainer">
                <Navbar />
                {this.state.user ?
                    <div className="user__leftContainer">
                        <div className="user__bandeauContainer">
                            <div className="user__avatarContainer">
                                <div className="user__avatar" onClick={() => { this.setState({ editAvatar: true }) }} style={{ backgroundImage: `url(${this.state.user.avatar})`, cursor: this.state.user._id === this.props.auth.user._id ? "pointer" : "inherit" }}></div>
                            </div>
                            <div className="user__infosContainer">
                                <div className="user__flexContainer">
                                    <h2 className="user__username">{this.state.user.username}</h2>
                                    {this.state.user._id !== this.props.auth.user._id ?
                                        <button className="user__followButton" onClick={() => { this.followOrUnfollow() }}>{this.props.auth.isAuthenticated && !this.state.user.followers.includes(this.props.auth.user._id) || !this.props.auth.isAuthenticated ? "SUIVRE" : "NE PLUS SUIVRE"}</button>
                                        :
                                        <button className="user__followButton" onClick={() => { window.location.pathname = "/editUser" }}>EDIT</button>
                                    }
                                </div>

                                <p className="user__createdTime"> membre depuis {getTimeElapsed(this.state.user.date)} </p>
                                <div className="user__flexContainer">
                                    <p className="user__numbers"><span className="user__number">{this.state.added_spots.length}</span> <span className="user__createdTime">spots ajoutés</span></p>
                                    <p className="user__numbers"><span className="user__number">{this.state.user.followers.length}</span> <span className="user__createdTime">abonnés</span></p>
                                    <p className="user__numbers"><span className="user__number">{this.state.user.follows.length}</span> <span className="user__createdTime">abonnements</span></p>
                                </div>
                                {this.state.user._id === this.props.auth.user._id && <button className="user__logOutButton" onClick={() => { this.props.logoutUser() }}>DECONNEXION</button>}

                            </div>
                        </div>
                        {this.state.editAvatar && this.props.auth.user._id === this.state.user._id &&
                            <EditAvatar changeUser={this.changeUser} user={this.state.user} cancelEdit={() => { this.setState({ editAvatar: false }) }} />
                        }
                    </div> : "pas d'utilisateur trouvé"}
                <div className="user__rightContainer">
                    <div className="user__radio">
                        <span onClick={() => { this.setState({ rightStatus: "added_spots" }) }} className="user__radioElement" style={{ color: this.state.rightStatus === "added_spots" ? "white" : variables.baseColor, backgroundColor: this.state.rightStatus === "added_spots" ? variables.baseColor : "white" }}>Spots ajoutés</span>
                        <span onClick={() => { this.setState({ rightStatus: "reviews" }) }} className="user__radioElement" style={{ color: this.state.rightStatus === "reviews" ? "white" : variables.baseColor, backgroundColor: this.state.rightStatus === "reviews" ? variables.baseColor : "white" }}>Avis laissés</span>
                    </div>

                    <div>

                        {this.state.rightStatus === "added_spots" &&
                            <React.Fragment>
                                {this.state.added_spots && this.state.added_spots.length > 0 ?
                                    <div >{this.state.added_spots.map((spot, id) => (
                                        <div className="user__rightElementContainer" onClick={() => { window.location.href = "/spot/" + spot._id }}>
                                            <div className="user__rightElementFlex">
                                                <div className="user__rightElementFlex">
                                                    <img src={this.state.iconsTypes[spot.type]} className="user__rightElementIcon" />
                                                    <p className="user__rightElementName">{spot.name}</p>
                                                </div>
                                                <span className="user__rightElementDate">ajouté le {new Date(spot.added_timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <p className="user__rightElementDescription"><b>Description :</b> {spot.description}</p>
                                            <p className="user__rightElementDescription"><b>Caractéristiques :</b> {this.state.spotFeatures.type[spot.type]} {spot.is_indoor === true ? "couvert" : "pas couvert"} de {this.state.spotFeatures.size[spot.size]}  </p>
                                        </div>
                                    ))}</div>
                                    :
                                    <div> pas spots</div>
                                }
                            </React.Fragment>
                        }

                        {this.state.rightStatus === "reviews" &&
                            <React.Fragment>
                                {this.state.user && this.state.user.reviews.length > 0 ?
                                    <div>{this.state.user.reviews.map((review, index) => (
                                        <div className="user__rightElementContainer" onClick={() => { window.location.href = "/spot/" + review.spot_id }}>
                                            <div className="user__rightElementFlex">
                                                <div className="user__rightElementFlex">
                                                    <img src={this.state.iconsTypes[this.state.reviewsSpots[index].type]} className="user__rightElementIcon" />
                                                    <p className="user__rightElementName">{this.state.reviewsSpots[index].name}</p>
                                                </div>
                                                <span className="user__rightElementDate">ajouté il y a {getTimeElapsed(Number(review.timestamp))}</span>
                                            </div>
                                            <div className="user__rightElementRate">
                                                <StarRatings
                                                    rating={review.rate}
                                                    starRatedColor={variables.baseColor2}
                                                    numberOfStars={5}
                                                    starDimension="15px"
                                                    starSpacing="5px"
                                                />
                                            </div>
                                            <p className="user__rightElementContent">{review.content} </p>
                                        </div>
                                    ))}</div>
                                    :
                                    <div> pas spots</div>
                                }
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logoutUser })(UserProfile)
