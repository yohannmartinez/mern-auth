import React from "react"
import './ThirdStep.scss'

//assets
import Dollar from "../../../../assets/FormIcons/dollar.svg"
import Skatepark from "../../../../assets/FormIcons/skatepark.svg"
import Street from "../../../../assets/FormIcons/street.svg"
import Indoor from "../../../../assets/FormIcons/indoor.svg"
import Outdoor from "../../../../assets/FormIcons/outdoor.svg"

import variables from '../../../../utils/base.scss'

const ThirdStep = (props) => {
    return (
        <div className="thirdStep__container">

            <p className="thirdStep__title">Quel Type de spot est-ce ?</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",0)}}>
                    <img src={Skatepark} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 0 ? variables.baseColor : "white",
                        color: props.values.type === 0 ? "white" : variables.baseColor,
                    }}>SkatePark</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",1)}}>
                    <img src={Street} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 1 ? variables.baseColor : "white",
                        color: props.values.type === 1 ? "white" : variables.baseColor,
                    }} >Street</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",2)}}>
                    <img src={Dollar} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 2 ? variables.baseColor : "white",
                        color: props.values.type === 2 ? "white" : variables.baseColor,
                    }}>Shop</p>
                </div>
            </div>

            <p className="thirdStep__title">Le spot est-il couvert ?</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("isIndoor",true)}}>
                    <img src={Indoor} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.isIndoor ? variables.baseColor : "white",
                        color: props.values.isIndoor ? "white" : variables.baseColor,
                    }}>Couvert</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("isIndoor",false)}}>
                    <img src={Outdoor} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: !props.values.isIndoor ? variables.baseColor : "white",
                        color: !props.values.isIndoor ? "white" : variables.baseColor,
                    }}>Pas couvert</p>
                </div>
            </div>

            <p className="thirdStep__title">De quelle taille est le spot</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",0)}}>
                    <div style={{height:"1em",width:"1em",background:variables.baseColor,borderRadius:"50%"}}></div>
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 0 ? variables.baseColor : "white",
                        color: props.values.size === 0 ? "white" : variables.baseColor,
                    }}>Petit</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",1)}}>
                <div style={{height:"2em",width:"2em",background:variables.baseColor,borderRadius:"50%"}}></div>
                <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 1 ? variables.baseColor : "white",
                        color: props.values.size === 1 ? "white" : variables.baseColor,
                    }}>Moyen</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",2)}}>
                <div style={{height:"3em",width:"3em",background:variables.baseColor,borderRadius:"50%"}}></div>
                <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 2 ? variables.baseColor : "white",
                        color: props.values.size === 2 ? "white" : variables.baseColor,
                    }}>Grand</p>
                </div>
            </div>
        </div>
    )
}

export default ThirdStep