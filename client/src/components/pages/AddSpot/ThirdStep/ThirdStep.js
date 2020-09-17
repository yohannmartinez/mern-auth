import React from "react"
import './ThirdStep.scss'

//assets
import Dollar from "../../../../assets/FormIcons/dollar.svg"
import Skatepark from "../../../../assets/FormIcons/skatepark.svg"
import Street from "../../../../assets/FormIcons/street.svg"
import Indoor from "../../../../assets/FormIcons/indoor.svg"
import Outdoor from "../../../../assets/FormIcons/outdoor.svg"

const ThirdStep = (props) => {
    console.log("third step", props)
    return (
        <div className="thirdStep__container">

            <p className="thirdStep__title">Quel Type de spot est-ce ?</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",0)}}>
                    <img src={Skatepark} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 0 ? "#0f2133" : "white",
                        color: props.values.type === 0 ? "white" : "#0f2133",
                    }}>SkatePark</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",1)}}>
                    <img src={Street} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 1 ? "#0f2133" : "white",
                        color: props.values.type === 1 ? "white" : "#0f2133",
                    }} >Street</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("type",2)}}>
                    <img src={Dollar} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.type === 2 ? "#0f2133" : "white",
                        color: props.values.type === 2 ? "white" : "#0f2133",
                    }}>Shop</p>
                </div>
            </div>

            <p className="thirdStep__title">Le spot est-il couvert ?</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("isIndoor",true)}}>
                    <img src={Indoor} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.isIndoor ? "#0f2133" : "white",
                        color: props.values.isIndoor ? "white" : "#0f2133",
                    }}>Couvert</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("isIndoor",false)}}>
                    <img src={Outdoor} className="thirdStep__answerIcon" />
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: !props.values.isIndoor ? "#0f2133" : "white",
                        color: !props.values.isIndoor ? "white" : "#0f2133",
                    }}>Pas couvert</p>
                </div>
            </div>

            <p className="thirdStep__title">De quelle taille est le spot</p>
            <div className="thirdStep__answersContainer">
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",0)}}>
                    <div style={{height:"1em",width:"1em",background:"#0f2133",borderRadius:"50%"}}></div>
                    <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 0 ? "#0f2133" : "white",
                        color: props.values.size === 0 ? "white" : "#0f2133",
                    }}>Petit</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",1)}}>
                <div style={{height:"2em",width:"2em",background:"#0f2133",borderRadius:"50%"}}></div>
                <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 1 ? "#0f2133" : "white",
                        color: props.values.size === 1 ? "white" : "#0f2133",
                    }}>Moyen</p>
                </div>
                <div className="thirdStep__answerCircle" onClick={()=>{props.changeIndex("size",2)}}>
                <div style={{height:"3em",width:"3em",background:"#0f2133",borderRadius:"50%"}}></div>
                <p className="thirdStep__answerLabel" style={{
                        backgroundColor: props.values.size === 2 ? "#0f2133" : "white",
                        color: props.values.size === 2 ? "white" : "#0f2133",
                    }}>Grand</p>
                </div>
            </div>
        </div>
    )
}

export default ThirdStep