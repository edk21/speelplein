import React from 'react'

const CustomInput = ({classes, htmlFor, label, inputId, inputType, onchange, placeholder}) => {
    return (
        <div className={`${classes}`}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                id={inputId}
                type={inputType}
                onChange={(event) => onchange(event.target.value)}
                className='form-control'
                autoComplete='off'
                placeholder={placeholder}
            />
        </div>
    )
}

export default CustomInput
