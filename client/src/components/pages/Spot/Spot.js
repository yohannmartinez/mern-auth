import React from "react"
import { connect } from "react-redux"

import { getSpotById, updateSpot } from "../../../services/spot"
import { getUserById, updateUser} from "../../../services/user"
import { setSelectedSpot } from "../../../actions/spotActions"
import { likeOrDislikeSpot } from "../../../services/likeOrDislikeSpot"
import Map from "../../elements/Map/Map"
import Like from "../../../assets/like.svg"
import Dislike from "../../../assets/dislike.svg"

import './Spot.scss'

class Spot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spot: null,
            spotCreator: null,
            userAuth: null,

            review:{
                title:"",
                content:"",
            }
        }
        this.LikeOrDislikeSpot = this.LikeOrDislikeSpot.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendReview = this.sendReview.bind(this)
    }

    async componentDidMount() {
        let spot_id = window.location.pathname.split('/')[2].replace("%20", "");
        let spotResponse = await getSpotById(spot_id);
        let creatorResponse = await getUserById(spotResponse.data.spot[0].added_by)
        let userAuth = await getUserById(this.props.auth.user._id)

        this.setState({ spot: spotResponse.data.spot[0], spotCreator: creatorResponse.data.user, userAuth: userAuth.data.user })
    }

    async LikeOrDislikeSpot(likeStatus) {
        let response = await likeOrDislikeSpot(likeStatus, this.state.spot, this.state.userAuth);
        this.setState({ spot: response.spot, userAuth: response.user })
    }

    onChange(e) {
        let review = this.state.review;
        review[e.target.name] = e.target.value;
        this.setState({review : review},()=>{console.log(this.state)})
    }

    async sendReview(e) {
        e.preventDefault()
        let addReviewUser = this.state.userAuth;
        let addReviewSpot = this.state.spot;
        addReviewUser.reviews.push({spot_id : this.state.spot._id, title : this.state.review.title, content: this.state.review.content});
        addReviewSpot.reviews.push({user_id : this.state.userAuth._id, title : this.state.review.title, content: this.state.review.content});
        let userResponse = await updateUser(addReviewUser, this.state.userAuth._id);
        let spotResponse = await updateSpot(addReviewSpot, this.state.spot._id);
        this.setState({userAuth : userResponse.data.user, spot : spotResponse.data.spot})
    }

    render() {
        return (
            <div className="spot__globalContainer">
                {this.state.spot && this.state.userAuth &&
                    <div className="spot__contentContainer" onClick={() => {
                        console.log(this.state.spot)
                    }}>
                        <div className="spot__leftContainer">
                            <div className="spot__mapContainer">
                                <Map user_location={[this.state.spot.longitude, this.state.spot.latitude]} map_zoom={15} addControl={true} spots={[this.state.spot]} />

                            </div>
                            <h1 className="spot__spotName">{this.state.spot.name}</h1>
                            <div className="spot__flexContainer">
                                <p>Ajouté le {new Date(this.state.spot.added_timestamp).toLocaleDateString()} par <b style={{ cursor: "pointer" }} onClick={() => {
                                    window.location.href = "/user/" + this.state.spot.added_by
                                }}>{this.state.spotCreator.username}</b></p>
                                <div className="spot__flexContainer">
                                    <button className="spot__likeButton" onClick={() => { this.LikeOrDislikeSpot('like') }} style={{ filter: this.state.spot.liked_by.includes(this.state.userAuth._id) ? "invert(11%) sepia(11%) saturate(2979%) hue-rotate(169deg) brightness(95%) contrast(96%)" : "invert(73%) sepia(3%) saturate(4%) hue-rotate(332deg) brightness(95%) contrast(84%)" }}><img src={Like} className="spot__likeButton__icon" /> {this.state.spot.liked_by.length}</button>
                                    <button className="spot__likeButton" onClick={() => { this.LikeOrDislikeSpot('dislike') }} style={{ filter: this.state.spot.disliked_by.includes(this.state.userAuth._id) ? "invert(11%) sepia(11%) saturate(2979%) hue-rotate(169deg) brightness(95%) contrast(96%)" : "invert(73%) sepia(3%) saturate(4%) hue-rotate(332deg) brightness(95%) contrast(84%)" }}><img src={Dislike} className="spot__likeButton__icon" /> {this.state.spot.disliked_by.length}</button>
                                </div>
                            </div>
                            <div className="spot__descriptionContainer">
                                <h3 className="spot__subTitle">Description</h3>
                                <p>{this.state.spot.description}</p>
                            </div>
                            <div className="spot__reviewsContainer">
                                <div>
                                    <h1>Rediger un avis</h1>
                                    <input name="title" value={this.state.review.title} onChange={this.onChange} placeholder="titre"/>
                                    <input name="content" value={this.state.review.content} onChange={this.onChange} placeholder="votre avis..."/>
                                    <button onClick={this.sendReview}>envoyer avis</button>
                                </div>
                                <h1>Avis({this.state.spot.reviews.length})</h1>
                                <div>
                                    {this.state.spot.reviews.map((review)=>(
                                        <div>
                                            {review.user} - {review.review}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="spot__rightContainer">
                            coucou
                        </div>
                    </div>
                }
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