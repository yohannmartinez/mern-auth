import React from "react"
import Input from "../../../elements/Input/Input"

const SecondStep = (props) => {
    return(
        <div>
            <Input tabIndex={"1"} label={"Nom du Spot"} value={props.values.name} name="name" onChange={props.handleChangeSpotInfos} />
            <Input tabIndex={"2"} label={"Description"} value={props.values.description} name="description"  onChange={props.handleChangeSpotInfos} placeholder={"Gap de 4 marches, grosse descente..."}/>
        </div>
    )
}

export default SecondStep