import React from "react"
import { uploadImage } from "../../../../services/s3"
import { updateUser } from "../../../../services/user"
import "./EditAvatar.scss"
import variables from "../../../../utils/base.scss"

class EditAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
        this.handleSelectedImageUpload = this.handleSelectedImageUpload.bind(this)
        this.changeAvatar = this.changeAvatar.bind(this);
        this.resetAvatar = this.resetAvatar.bind(this);
    }

    handleSelectedImageUpload = e => {
        this.setState({ image: e.target.files }, () => {
            this.changeAvatar()
        });
    };

    async changeAvatar() {
        const imageData = new FormData();
        imageData.append('file', this.state.image[0]);
        const link = await uploadImage(imageData);
        let user = this.props.user;
        console.log(link)
        user.avatar = link.data.Location;
        updateUser(user, this.props.user._id, false)
        window.location.reload()
    }

    resetAvatar() {
        let user = this.props.user;
        user.avatar = "https://spoots.s3.eu-west-3.amazonaws.com/emptyuserphoto.png";
        updateUser(user, this.props.user._id)
    }

    render() {
        return (
            <div className="editAvatar__background">
                <div className="editAvatar__container">
                    <div className="editAvatar__description">Modifier la photo de profil</div>
                    <label className="editAvatar__button" style={{color:variables.baseColor}}><b>Importer une photo</b>
                    <input className="editAvatar__input" type="file" onChange={this.handleSelectedImageUpload} />
                    </label>
                    <button className="editAvatar__button" style={{color:"#ED4956"}} onClick={()=>{this.resetAvatar()}}><b>Supprimer la photo actuelle</b></button>
                    <button className="editAvatar__button" onClick={()=>{this.props.cancelEdit()}}>Annuler</button>
                </div>
            </div>
        )
    }


}

export default EditAvatar