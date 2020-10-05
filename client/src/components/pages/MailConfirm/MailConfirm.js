import React from "react"
import {checkToken} from "../../../services/emailCheckTokens"

class MailConfirm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            tokenResponse:null,
        }
    }

    async componentDidMount() {
        let token = window.location.pathname.split('/')[2].replace("%20", "");
        let tokenResponse = await checkToken(token);
        this.setState({tokenResponse : tokenResponse.data, loading: false})
    }

    render() {
        return(
            <div onClick={()=>{console.log(this.state)}}>
                {this.state.loading ? "chargement" : <div>
                    {this.state.tokenResponse.success ? "email updated" : "not updated"}
                    </div>}
            </div>
        )
    }
}

export default MailConfirm