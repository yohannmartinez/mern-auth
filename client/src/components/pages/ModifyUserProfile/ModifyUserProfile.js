import React from "react"
import { connect } from "react-redux"
import Input from "../../elements/Input/Input"
import { changeEmail, changePassword, getUserById } from "../../../services/user"
import { logoutUser } from "../../../actions/authActions"

import './ModifyUserProfile.scss'

class ModifyUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //editStatus
            status: {
                editEmailStatus: true,
                editPasswordStatus: false,
            },

            userAuth: null,

            email: "",
            confirmEmail: "",
            old_password: "",
            new_password: "",
            confirm_password: "",

            error: null,
            response: null,
        }

        this.onChange = this.onChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    async componentDidMount() {
        let userResponse = await getUserById(this.props.auth.user._id);
        this.setState({ userAuth: userResponse.data.user })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeStatus(statusName) {
        let statusCopy = this.state.status;
        Object.keys(this.state.status).map(el => statusCopy[el] = false)
        statusCopy[statusName] = true;
        this.setState({
            status: statusCopy
        })
    }

    async changeEmail() {
        let response = await changeEmail(this.state.email, this.state.confirmEmail, this.props.auth.user.email, this.props.auth.user._id)
        if (response.data.user) {
            this.props.logoutUser();
        } else {
            this.setState({ error: response.data })
        }
    }

    async changePassword() {
        let response = await changePassword(this.state.old_password, this.state.new_password, this.state.confirm_password, this.props.auth.user._id, this.props.auth.user.email)
        if (response.data.user) {
            this.props.logoutUser();
        } else {
            this.setState({ error: response.data })
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="modifyUserProfile__container">
                <div className="modifyUserProfile__categories">
                    <button onClick={() => { window.location.href = "/user/" + this.props.auth.user._id }} className="modifyUserProfile__back">Retour</button>
                    <button onClick={() => { this.changeStatus("editEmailStatus") }} className="modifyUserProfile__tab">E-mail</button>
                    <button onClick={() => { this.changeStatus("editPasswordStatus") }} className="modifyUserProfile__tab">Mot de passe</button>
                </div>

                <div className="modifyUserProfile__edit">
                    {this.state.status.editEmailStatus &&
                        <div>
                            <h1 className="modifyUserProfile__title">Adresse E-mail</h1>
                            <p><b>actuelle : </b> {this.props.auth.user.email}</p>
                            <span>{this.state.userAuth && this.state.userAuth.email_checked === false ? "email pas vérifié" : "email vérifié"}</span>
                            <h2 className="modifyUserProfile__sub">Changer l'adresse e-mail</h2>
                            <Input tabIndex={"1"} label={"Nouvelle adresse e-mail"} value={this.state.email} name="email" onChange={this.onChange} />
                            {this.state.error && this.state.error.email && <p className="modifyUserProfile__error">{this.state.error.email}</p>}
                            <Input tabIndex={"2"} label={"Confirmer l'adresse e-mail"} value={this.state.confirmEmail} name="confirmEmail" onChange={this.onChange} />
                            {this.state.error && this.state.error.confirmEmail && <p className="modifyUserProfile__error">{this.state.error.confirmEmail}</p>}
                            <button className="modifyUserProfile__button" onClick={() => { this.changeEmail() }}>Changer l'email</button>
                        </div>
                    }

                    {this.state.status.editPasswordStatus &&
                        <div>
                            <h1 className="modifyUserProfile__title">Mot de passe</h1>
                            <h2 className="modifyUserProfile__sub">Changer le mot de passe</h2>
                            <Input tabIndex={"1"} label={"Ancien mot de passe"} value={this.state.old_password} name="old_password" onChange={this.onChange} type="password" />
                            {this.state.error && this.state.error.oldPassword && <p className="modifyUserProfile__error">{this.state.error.oldPassword}</p>}
                            <Input tabIndex={"2"} label={"Nouveau mot de passe"} value={this.state.new_password} name="new_password" onChange={this.onChange} type="password" />
                            {this.state.error && this.state.error.newPassword && <p className="modifyUserProfile__error">{this.state.error.newPassword}</p>}
                            <Input tabIndex={"3"} label={"confirmer le nouveau mot de passe"} value={this.state.confirm_password} name="confirm_password" onChange={this.onChange} type="password" />
                            {this.state.error && this.state.error.confirmPassword && <p className="modifyUserProfile__error">{this.state.error.confirmPassword}</p>}
                            <button className="modifyUserProfile__button" onClick={() => { this.changePassword() }}>Changer le mot de passe</button>
                        </div>
                    }
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

export default connect(mapStateToProps, { logoutUser })(ModifyUserProfile);

