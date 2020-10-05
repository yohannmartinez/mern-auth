import React from 'react'
import mapboxgl from "mapbox-gl"
import Map from "../../elements/Map/Map"
import { connect } from "react-redux"
import { addSpot } from "../../../services/spot"
import { getUserById } from "../../../services/user"
import Navbar from "../../elements/Navbar/Navbar"
import variables from "../../../utils/base.scss"
import SecondStep from "./SecondStep/SecondStep"
import ThirdStep from "./ThirdStep/ThirdStep"
import "./Addspot.scss"
import { json } from 'body-parser'

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,

            //step states
            current_step: 0,

            //map states
            user_location: [2, 46.8],
            map_zoom: 5,

            userAuth:null,
            errorPosition:null,
            //form content
            spot_infos: {
                longitude: null,
                latitude: null,
                name: "",
                type: 0, //index of selected type
                added_by: null,
                added_timestamp: null,
                isIndoor: false,
                description: "",
                size: 0, //index of selected size
            }
        }
        this.getcenter = this.getcenter.bind(this);
        this.handleChangeSpotInfos = this.handleChangeSpotInfos.bind(this);
        this.changeIndex = this.changeIndex.bind(this);
    }

    async componentDidMount() {
        let userReponse = await getUserById(this.props.auth.user._id);console.log(userReponse);
        
        navigator.geolocation.getCurrentPosition((position) => {
            let infos = this.state.spot_infos;
            infos.latitude = position.coords.latitude;
            infos.longitude = position.coords.longitude;
            this.setState({ user_location: [position.coords.longitude, position.coords.latitude], map_zoom: 12, spot_infos: infos, },()=>{console.log("coucou",this.state)});
        }, (err) => {if(err){this.setState({errorPosition : err.message})}}, { enableHighAccuracy: true, maximumAge: 0 })
        this.setState({userAuth: userReponse.data.user})
    }

    getcenter(center) {
        let infos = this.state.spot_infos;
        infos.latitude = center.lat;
        infos.longitude = center.lng;
        this.setState({ spot_infos: infos })
    }

    changeIndex(modifiedState, index) {
        let infos = this.state.spot_infos;
        infos[modifiedState] = index;
        this.setState({ spot_infos: infos })
    }

    handleChangeSpotInfos(e) {
        let infos = this.state.spot_infos;
        infos[e.target.name] = e.target.value;
        this.setState({ spot_infos: infos, error:null })
    }

    render() {
        return (
            <div className="addSpot__container" onClick={()=>{console.log(this.state)}}>
                <Navbar />
                <div className="addSpot__leftPart">
                    <div className="addSpot__contentContainer">
                        <h1 className="addSpot__title">Ajouter un Spot</h1>
                        <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 0 ? "inherit" : "none" }}>
                            <p className="addSpot__stepDescription"><b>Etape 1 :</b> placez le marqueur à l'endroit du Spot</p>
                            <p className="addSpot__error">{this.state.error && this.state.error.mapPoint}</p>

                        </div>

                        <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 1 ? "inherit" : "none" }}>
                            <p className="addSpot__stepDescription"><b>Etape 2 :</b> Complétez les informations à propos du Spot</p>
                            <SecondStep values={this.state.spot_infos} handleChangeSpotInfos={this.handleChangeSpotInfos} error={this.state.error}/>
                        </div>

                        <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 2 ? "inherit" : "none" }}>
                            <p className="addSpot__stepDescription"><b>Etape 3 :</b> Quelques dernières informations</p>
                            <ThirdStep changeIndex={this.changeIndex} values={this.state.spot_infos} handleChangeSpotInfos={this.handleChangeSpotInfos} />
                        </div>
                    </div>


                    <div className="addSpot__stepButtonsContainer">
                        {this.state.current_step < 2 &&
                            <button className="addSpot__nextStepButton" onClick={() => {
                                if(this.state.current_step === 0 && this.state.errorPosition && JSON.stringify(this.state.user_location) === JSON.stringify([2, 46.8])) {
                                    this.setState({error : {mapPoint : "Veuillez déplacer le curseur sur votre point"}})
                                } else if (this.state.current_step === 1 && this.state.spot_infos.name.split('').filter(keys => keys !== " ").length === 0) {
                                    this.setState({ error: {name: "Veuillez attribuer un nom au Spot"} })
                                } else if (this.state.current_step === 1 && this.state.spot_infos.name.split('').filter(keys => keys !== " ").length > 0 && this.state.spot_infos.name.split('').filter(keys => keys !== " ").length < 5) {
                                    this.setState({ error: {name : "Le nom est trop court"} })
                                } else if (this.state.current_step === 1 && this.state.spot_infos.description.split('').filter(keys => keys !== " ").length < 15) {
                                    this.setState({ error: {description : "La description est trop courte"} })
                                } else {
                                    this.setState({ current_step: this.state.current_step + 1, error: null })
                                }
                            }}>
                                Suivant
                        </button>
                        }

                        {this.state.current_step === 2 &&
                            <button className="addSpot__addSpotButton" onClick={() => {
                                let infos = this.state.spot_infos;
                                infos.added_by = this.props.auth.user._id;
                                infos.added_timestamp = Date.now();
                                this.setState({ spot_infos: infos }, () => {
                                    console.log('addspot', this.state.spot_infos, this.state.userAuth)
                                    addSpot(this.state.spot_infos, this.props.history, this.state.userAuth);
                                })
                            }}>
                                Ajouter le spot
                        </button>
                        }

                        {this.state.current_step > 0 && this.state.current_step < 3 &&
                            <button className="addSpot__previousStepButton" onClick={() => { this.setState({ current_step: this.state.current_step - 1 }) }}>
                                Précédant
                        </button>
                        }


                    </div>
                </div>
                <div className="addSpot__mapContainer">
                    {this.state.current_step >  0 && <div className="addSpot__mapContainerOverlay"></div>}
                    <Map user_location={this.state.user_location} map_zoom={this.state.map_zoom} getCenter={this.getcenter} addControl={false} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,

});

export default connect(mapStateToProps,null)(AddSpot)  