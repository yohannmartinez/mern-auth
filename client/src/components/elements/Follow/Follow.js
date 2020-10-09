import React from 'react'
import { getUserById, followUser, unfollowUser } from '../../../services/user';

import CloseIcon from "../../../assets/cross.svg"
import './Follow.scss'

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targeted_user: null,
            targeted_user_follows: null, //informations about targeted user followers/following

            auth_user: null,

            loading: true
        }
    }

    async componentDidMount() {
        let targeted_user_response = await getUserById(this.props.targeted_user_id);
        let targeted_user_follows_response = [];
        if (targeted_user_response.data.user[this.props.followType].length > 0) {
            let follows = await Promise.all(targeted_user_response.data.user[this.props.followType].map((follow) => getUserById(follow)))
            follows.map((follow, index) => follows[index] = follow.data.user)
            targeted_user_follows_response = follows
        }
        let auth_user_response = await getUserById(this.props.auth_user_id);
        this.setState({ loading: false, auth_user: auth_user_response.data.user, targeted_user: targeted_user_response.data.user, targeted_user_follows: targeted_user_follows_response }, () => { console.log("test", this.state) })
    }

    async followUser(user_following, user_followed) {
        let following = await followUser(user_following, user_followed)
        let user = this.state.auth_user;
        user.follows.push(user_followed)
        this.setState({ auth_user: user })
        console.log("following", following)
    }

    async unfollowUser(user_unfollowing, user_unfollowed) {
        let unfollowing = await unfollowUser(user_unfollowing, user_unfollowed)
        let user = this.state.auth_user;
        user.follows.splice(user.follows.indexOf(user_unfollowed), 1)
        this.setState({ auth_user: user })
        console.log("unfollowing", unfollowing)
    }

    render() {

        return (
            <div className="Follow">
                {!this.state.loading &&
                    <div className="Follow__container">
                        <div className="Follow__baseContainer">
                            <img src={CloseIcon} className="Follow__closeIcon colorToFilterBase" onClick={()=>{this.props.closeModal()}}/>
                        </div>

                        {this.props.followType === "followers" && <h1 className="Follow__title">Abonnés de {this.state.targeted_user.username} ({this.state.targeted_user_follows.length})</h1>}
                        {this.props.followType === "follows" && <h1 className="Follow__title">Abonnements de {this.state.targeted_user.username} ({this.state.targeted_user_follows.length})</h1>}
                        <div>
                            {this.state.targeted_user_follows.length > 0 ?

                                //if targeted user as followers or is following poeples
                                <div className="Follow__followsContainer">
                                    {this.state.targeted_user_follows.map((follow) => (
                                        <div className="Follow__followContainer">
                                            <div className="Follow__followInfosContainer">
                                                <div style={{ backgroundImage: `url('${follow.avatar}')` }} className="Follow__followAvatar"></div>
                                                <p className="Follow__followUsername" onClick={() => { window.location.href = "/user/" + follow._id }}>{follow.username}</p>
                                            </div>
                                            {follow._id !== this.state.auth_user._id &&
                                                <React.Fragment>
                                                    {this.state.auth_user.follows.includes(follow._id) ?
                                                        <button className="Follow__followButton" onClick={() => { this.unfollowUser(this.state.auth_user._id, follow._id) }}>NE PLUS SUIVRE</button> :
                                                        <button className="Follow__followButton" onClick={() => { this.followUser(this.state.auth_user._id, follow._id) }}>SUIVRE</button>
                                                    }
                                                </React.Fragment>
                                            }
                                        </div>
                                    ))}
                                </div>
                                :
                                //if targeted user asn't any followers or isn't following poeples
                                <div>"pas mmontrer"</div>}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Follow