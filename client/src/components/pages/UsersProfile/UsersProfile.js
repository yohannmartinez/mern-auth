import React from "react"
import { connect } from "react-redux"

import EditAvatar from "./EditAvatar/EditAvatar"

import { getUserById, followUser, unfollowUser } from "../../../services/user"
import { getAddedSpotsByUserId } from "../../../services/spot"
import { getTimeElapsed } from "../../../services/getTimeElapsed"
import { logoutUser } from "../../../actions/authActions";

import './UsersProfile.scss'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            added_spots: null,
            editAvatar: false,
        }
        this.followOrUnfollow = this.followOrUnfollow.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    async componentDidMount() {
        let user_id = window.location.pathname.split('/')[2].replace("%20", "");
        let user = await getUserById(user_id)
        let added_spots = await getAddedSpotsByUserId(user_id)
        this.setState({ user: user.data.user, added_spots: added_spots.data.spots }, () => {
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
                {this.state.user ?
                    <div className="user__contentContainer">
                        <div className="user__bandeauContainer">
                            <div className="user__avatarContainer">
                                <div className="user__avatar" onClick={() => { this.setState({ editAvatar: true }) }} style={{ backgroundImage: `url(${this.state.user.avatar})`, cursor : this.state.user._id === this.props.auth.user._id ? "pointer" : "inherit" }}></div>
                            </div>
                            <div className="user__infosContainer">
                                <div className="user__flexContainer">
                                    <h2 className="user__username">{this.state.user.username}</h2>
                                    {this.state.user._id !== this.props.auth.user._id ?
                                        <button className="user__followButton" onClick={() => { this.followOrUnfollow() }}>{this.props.auth.isAuthenticated && !this.state.user.followers.includes(this.props.auth.user._id) || !this.props.auth.isAuthenticated ? "suivre" : "ne plus suivre"}</button>
                                        :
                                        <button className="user__followButton" onClick={()=>{window.location.pathname = "/editUser"}}>modifier le profil</button>
                                    }
                                </div>
                                <div className="user__flexContainer">
                                    <p className="user__numbers"><b>{this.state.user.added_spots.length}</b> spots ajouté{this.state.user.added_spots.length > 1 || this.state.user.added_spots.length === 0 && "s"}</p>
                                    <p className="user__numbers"><b>{this.state.user.followers.length}</b> abonné{this.state.user.followers.length > 1 || this.state.user.followers.length === 0 && "s"}</p>
                                    <p className="user__numbers"><b>{this.state.user.follows.length}</b> abonnement{this.state.user.follows.length > 1 || this.state.user.follows.length === 0 && "s"}</p>
                                </div>
                                <p> membre depuis {getTimeElapsed(this.state.user.date)} </p>
                            </div>
                        </div>
                        <div>
                            <h1>Spots ajoutés</h1>

                            {this.state.added_spots &&
                                <React.Fragment>{this.state.added_spots.length > 0 ?
                                    <div>
                                        {this.state.added_spots.map((spot, index) => (
                                            <div key={index}>{spot.name}</div>
                                        ))}
                                    </div>
                                    :
                                    <div>Aucun spots ajoutés</div>
                                }</React.Fragment>
                            }
                        </div>
                        {this.state.user._id === this.props.auth.user._id &&
                            <div>
                                
                                <button onClick={() => {
                                    this.props.logoutUser();
                                }}>déconnexion</button>

                                {this.state.editAvatar &&
                                    <EditAvatar changeUser={this.changeUser} user={this.state.user} cancelEdit={()=>{this.setState({editAvatar : false})}}/>
                                }
                            </div>
                        }
                    </div> : "pas d'utilisateur trouvé"}


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
