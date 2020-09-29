import React from 'react'
import './Input.scss'

const Input = ({tabindex, label , value, name, placeholder , onChange, type}) => {
    return (
        <div className="input__container">
            <input className="input__input" autoComplete="off" tabindex={tabindex} value={value} name={name} onChange={onChange} placeholder={placeholder ? placeholder : " "} type={type}/>
            <label className="input__label">{label}</label>
        </div>
    )
}

export default Input