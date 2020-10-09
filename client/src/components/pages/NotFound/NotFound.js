import React from "react"
import Navbar from '../../elements/Navbar/Navbar'
import NotFoundImage from "../../../assets/notfound.svg"
import './NotFound.scss'

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div className="NotFound__NotFoundContainer">
                        <img src={NotFoundImage} className="NotFound__NotFoundImage" />
                        <p className="NotFound__NotFoundText">Oops, la page demandée n'existe pas :(</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound