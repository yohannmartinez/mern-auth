import React from "react"
import Input from "../../../elements/Input/Input"

const SecondStep = (props) => {
    return (
        <div className="inputsContainer">
            <div className="inputAuthContainer">
                <input tabIndex={"1"} onChange={props.handleChangeSpotInfos} value={props.values.name} name="name" className="inputAuth" autoComplete="off" />
                <label className="inputAuthLabel littleTextGrey">Nom du spot {props.error && props.error.name ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {props.error.name}</span> : ""}</label>
                <div className="inputAuthFocus"></div>
            </div>
            <div className="inputAuthContainer">
                <input tabIndex={"2"} onChange={props.handleChangeSpotInfos} value={props.values.description} name="description" className="inputAuth" autoComplete="off" />
                <label className="inputAuthLabel littleTextGrey">Description {props.error && props.error.description ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {props.error.description}</span> : ""}</label>
                <div className="inputAuthFocus"></div>
            </div>
        </div>
    )
}

export default SecondStep