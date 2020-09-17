import React from "react"
import Input from "../../../elements/Input/Input"

const SecondStep = (props) => {
    console.log(props)
    return(
        <div>
            <Input tabindex={"1"} label={"Nom du Spot"} value={props.values.name} name="name" onChange={props.handleChangeSpotInfos} />
            <Input tabindex={"2"} label={"Description"} value={props.values.description} name="description"  onChange={props.handleChangeSpotInfos} />
        </div>
    )
}

export default SecondStep