import React, { useReducer } from "react"
import Navbar from "../../elements/Navbar/Navbar"
import { checkIfEmail, setNewPassword } from "../../../services/user"
import { createToken, checkToken } from "../../../services/forgotPasswordTokens"

import SuccessIcon from "../../../assets/valid.svg"
import './ForgotPassword.scss'

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            step: 0,

            //first step
            email: "",

            //seconde step
            token: null,
            code: "",

            //third step
            new_password: "",
            new_password_confirm: "",
        }
        this.onChange = this.onChange.bind(this)
        this.firstStep = this.firstStep.bind(this);
        this.secondStep = this.secondStep.bind(this);
        this.thirdStep = this.thirdStep.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    async firstStep(email) {
        let emailCheck = await checkIfEmail(email);
        if (emailCheck.data.success) {
            console.log(emailCheck)
            let tokenResponse = await createToken(email);
            console.log(tokenResponse)
            this.setState({ errors: {}, step: 1, token: tokenResponse.data, user_id: emailCheck.data.success._id })
        } else {
            this.setState({ errors: { email: "Adresse email introuvable" } })
        }
    }

    async secondStep(token_id, code) {
        let now = Date.now();
        console.log(new Date(this.state.token.expires_in), new Date(now))
        if (now > this.state.token.expires_in) {
            this.setState({ errors: { expired: "Le code à expiré, veuillez recommencer" } })
        } else {
            let codeCheck = await checkToken(token_id, code);
            if (codeCheck.data.success) {
                this.setState({ errors: {}, step: 2 })
            } else {
                this.setState({ errors: { code: "Le code n'est pas bon" } })
            }
        }

    }

    async thirdStep(user_id, new_password, user_email) {
        if (this.state.new_password.length < 8) {
            this.setState({ errors: { new_password: "Mot de passe trop court" } })
        } else if (this.state.new_password !== this.state.new_password_confirm) {
            this.setState({ errors: { new_password_confirm: "Les mots de passe ne se correspondent pas" } })
        } else {
            let newPassordReponse = await setNewPassword(user_id, new_password, user_email)
            if (newPassordReponse.data.success) {
                this.setState({ errors: {}, step: 3 })
            } else {
                this.setState({ errors: { change_password: "Une erreur est survenue lors du changement de mot de passe, veuillez réessayer ultérieurement" } })
            }

        }

    }

    render() {
        const { errors } = this.state;

        return (
            <div className="forgotPassword" onClick={() => { console.log(this.state) }}>
                <Navbar />
                <div className="forgotPassword__stepsContainer">


                    {this.state.step === 0 &&
                        <div className="forgotPassword__stepContainer">
                            <h1 className="forgotPassword__stepTitle">Commençons par trouver votre compte</h1>
                            <p className="forgotPassword__stepText">Saisissez votre adresse email </p>
                            <div className="inputsContainer">
                                <div className="inputAuthContainer">
                                    <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" className="inputAuth" type="email" autoComplete="off" />
                                    <label className="inputAuthLabel littleTextGrey">Email {errors.email || errors.emailnotfound ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.email || errors.emailnotfound}</span> : ""}</label>
                                    <div className="inputAuthFocus"></div>
                                </div>
                            </div>
                            <div className="forgotPassword__buttonsContainer">
                                <button className="buttonWhite" onClick={() => { window.location.href = "/login" }}>Annuler</button>
                                <button className="buttonBlack" onClick={() => { this.firstStep(this.state.email) }}>Trouver</button>
                            </div>
                        </div>
                    }

                    {this.state.step === 1 &&
                        <div className="forgotPassword__stepContainer">
                            <h1 className="forgotPassword__stepTitle">Nous venons de vous envoyer un code de vérification</h1>
                            <p className="forgotPassword__stepText">Nous venons d’envoyer un code de vérification à votre adresse e-mail. Si vous ne recevez pas notre message, vérifiez dans les courriers indésirables de votre messagerie ou réessayez</p>
                            <div className="inputsContainer">
                                <div className="inputAuthContainer">
                                    <input onChange={this.onChange} value={this.state.code} error={errors.code} id="code" className="inputAuth" type="text" autoComplete="off" />
                                    <label className="inputAuthLabel littleTextGrey">Code {errors.code ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.code}</span> : ""}</label>
                                    <div className="inputAuthFocus"></div>
                                </div>
                            </div>
                            {this.state.errors && this.state.errors.expired && <span className="inputAuthError" style={{ color: "#E7366A" }}>Le code à expiré</span>}
                            <div className="forgotPassword__buttonsContainer">
                                <button className="buttonWhite" onClick={() => { window.location.href = "/login" }}>Annuler</button>
                                <button className="buttonBlack" onClick={() => { this.secondStep(this.state.token._id, this.state.code) }}>Envoyer</button>
                            </div>
                        </div>
                    }

                    {this.state.step === 2 &&
                        <div className="forgotPassword__stepContainer">
                            <h1 className="forgotPassword__stepTitle">Tout se déroule comme sur des roulettes</h1>
                            <p className="forgotPassword__stepText">Vous pouvez maintenant entrer votre nouveau mot de passe</p>
                            <div className="inputsContainer">
                                <div className="inputAuthContainer">
                                    <input onChange={this.onChange} value={this.state.new_password} error={errors.new_password} id="new_password" className="inputAuth" type="password" autoComplete="off" />
                                    <label className="inputAuthLabel littleTextGrey">nouveau mdp {errors.new_password ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.new_password}</span> : ""}</label>
                                    <div className="inputAuthFocus"></div>
                                </div>
                                <div className="inputAuthContainer">
                                    <input onChange={this.onChange} value={this.state.new_password_confirm} error={errors.new_password_confirm} id="new_password_confirm" className="inputAuth" type="password" autoComplete="off" />
                                    <label className="inputAuthLabel littleTextGrey">confirmer mdp {errors.new_password_confirm ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.new_password_confirm}</span> : ""}</label>
                                    <div className="inputAuthFocus"></div>
                                </div>
                            </div>
                            {this.state.errors && this.state.errors.change_password && <span className="inputAuthError" style={{ color: "#E7366A" }}>{this.state.errors.change_password}</span>}

                            <div className="forgotPassword__buttonsContainer">
                                <button className="buttonWhite" onClick={() => { window.location.href = "/login" }}>Annuler</button>
                                <button className="buttonBlack" onClick={() => { this.thirdStep(this.state.user_id, this.state.new_password, this.state.email) }}>Envoyer</button>
                            </div>
                        </div>
                    }

                    {this.state.step === 3 &&
                        <div className="forgotPassword__stepContainer">
                            <div className="forgotPassword__updatedSuccessContainer">
                                <div className="forgotPassword__flexContainer">
                                    <img className="forgotPassword__updatedSuccessIcon" src={SuccessIcon} />
                                    <p className="forgotPassword__updatedSuccessText">Votre passe à été modifié</p>
                                </div>
                                <button className="forgotPassword__updatedSuccessButton" onClick={() => { window.location.href = "/login" }}>Retourner à l'acceuil</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export default ForgotPassword