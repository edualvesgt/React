import React from 'react';
import './FormComponents.css'

export const Input = ({ type, id, value, required, additionalClass, name, placeholder, manipulationFunction }) => {

    <input
        type={type} id={id}
        value={value} required={required ? "required" : ""}
        className={`input-component ${additionalClass}`} name={name}
        placeholder={placeholder} onChange={manipulationFunction}
        autoComplete='off'

    />
}

export const Label = (htmlFor, labelText) => {

    return <label htmlFor={htmlFor}> {labelText}</label>
}

export const Button = ({ textButton, name, id, type, manipulationFunction, additionalClass }) => {
    return (
        <button id={id} name={name} type={type} className={additionalClass} onClick={manipulationFunction}>
            {textButton}
        </button>
    )
}


