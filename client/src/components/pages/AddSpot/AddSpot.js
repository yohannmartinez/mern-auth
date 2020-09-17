import React from 'react'
import mapboxgl from "mapbox-gl"
import Map from "../../elements/Map/Map"
import {connect} from "react-redux"
import axios from "axios"

import SecondStep from "./SecondStep/SecondStep"
import ThirdStep from "./ThirdStep/ThirdStep"
import "./Addspot.scss"

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //step states
            current_step: 0,

            //map states
            user_location: [2, 46.8],
            map_zoom: 5,

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

    componentDidMount() {
        console.log(this.props)
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ user_location: [position.coords.longitude, position.coords.latitude], map_zoom: 12 });
        }, () => { }, { enableHighAccuracy: true, maximumAge: 0 })
    }

    getcenter(center) {
        let infos = this.state.spot_infos;
        infos.latitude = center.lat;
        infos.longitude = center.lng;
        this.setState({spot_infos : infos},()=>{console.log("infos updated handle change",this.state)})
    }

    changeIndex(modifiedState, index) {
        console.log(modifiedState, index)
        let infos = this.state.spot_infos;
        infos[modifiedState] = index;
        this.setState({spot_infos : infos},()=>{console.log("infos updated handle change",this.state)})
    }

    handleChangeSpotInfos(e) {
        console.log(e.target.name,"event")
        let infos = this.state.spot_infos;
        infos[e.target.name] = e.target.value;
        this.setState({spot_infos : infos},()=>{console.log("infos updated handle change",this.state)})
    }

    render() {
        return (
            <div className="addSpot__formContainer">
                <h1 className="addSpot__title">Ajouter un Spot</h1>
                <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 0 ? "inherit" : "none" }}>
                    <p className="addSpot__stepDescription"><b>Etape 1 :</b> placez le marqueur à l'endroit du Spot</p>
                    <div className="addSpot__mapContainer" >
                        <Map user_location={this.state.user_location} map_zoom={this.state.map_zoom} getCenter={this.getcenter} addControl={false} />
                    </div>
                </div>

                <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 1 ? "inherit" : "none" }}>
                    <p className="addSpot__stepDescription"><b>Etape 2 :</b> Complétez les informations à propos du Spot</p>
                    <SecondStep values={this.state.spot_infos} handleChangeSpotInfos={this.handleChangeSpotInfos}/>
                </div>

                <div className="addSpot__stepContainer" style={{ display: this.state.current_step === 2 ? "inherit" : "none" }}>
                    <p className="addSpot__stepDescription"><b>Etape 3 :</b> Quelques dernières informations</p>
                    <ThirdStep changeIndex={this.changeIndex} values={this.state.spot_infos} handleChangeSpotInfos={this.handleChangeSpotInfos} />
                </div>

                <div className="addSpot__stepButtonsContainer">
                    {this.state.current_step > 0 && this.state.current_step < 3 &&
                        <button className="addSpot__previousStepButton" onClick={() => { console.log(this.state);this.setState({ current_step: this.state.current_step - 1 }) }}>
                            Précédant
                        </button>
                    }
                    {this.state.current_step < 2 &&
                        <button className="addSpot__nextStepButton" onClick={() => { this.setState({ current_step: this.state.current_step + 1 }) }}>
                            Suivant
                        </button>
                    }
                    {this.state.current_step === 2 &&
                        <button className="addSpot__addSpotButton" onClick={() => {
                            let infos = this.state.spot_infos;
                            infos.added_by = this.props.auth.user.username;
                            infos.added_timestamp = Date.now();
                            this.setState({spot_infos : infos},()=>{
                                console.log(this.state.spot_infos)
                            })
                        }}>
                            Ajouter le spot
                        </button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(AddSpot)  