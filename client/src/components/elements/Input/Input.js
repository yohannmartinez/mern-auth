import React from 'react'
import './Input.scss'

const Input = ({tabindex, label , value, name, placeholder , onChange}) => {
    console.log(label);
    return (
        <div className="input__container">
            <input className="input__input" tabindex={tabindex} value={value} placeholder={placeholder} name={name} onChange={onChange} placeholder="&nbsp;"/>
            <label className="input__label">{label}</label>
        </div>
    )
}

export default Input