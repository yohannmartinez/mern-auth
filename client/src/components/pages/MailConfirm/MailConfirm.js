import React from "react"
import { checkToken } from "../../../services/emailCheckTokens"
import CheckedIcon from "../../../assets/valid.svg"
import ErrorIcon from "../../../assets/error.svg"
import "./MailConfirm.scss"

class MailConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tokenResponse: null,
        }
    }

    async componentDidMount() {
        let token = window.location.pathname.split('/')[2].replace("%20", "");
        let tokenResponse = await checkToken(token);
        console.log(tokenResponse)
        this.setState({ tokenResponse: tokenResponse.data, loading: false })
    }

    render() {
        return (
            <div onClick={() => { console.log(this.state) }} className="mailconfirm">
                {this.state.loading ? "chargement" : <div>
                    {this.state.tokenResponse.success ?
                        <div className="mailconfirm__successContainer">
                            <img src={CheckedIcon} className="mailconfirm__successIcon" />
                            <span className="mailconfirm__successText">Adresse email confirmée, merci</span>
                            <button className="mailconfirm__buttonSuccess" onClick={()=>{window.location.href = "/"}}>Aller a l'acceuil</button>

                        </div> : <div className="mailconfirm__failureContainer">
                            <img src={ErrorIcon} className="mailconfirm__failureIcon" />
                            <span className="mailconfirm__failureText">Impossible de confirmer l'adresse email, veuillez vérifier que l'url entré correspond bien à celui indiqué sur le mail qui vous à été envoyé</span>
                            <button className="mailconfirm__buttonFailure" onClick={()=>{window.location.href = "/"}}>Aller a l'acceuil</button>
                        </div>}
                </div>}
            </div>
        )
    }
}

export default MailConfirm