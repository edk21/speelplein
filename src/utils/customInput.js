import React from 'react'

const customInput = ({classes, htmlFor, label, inputId, inputType, onchange}) => {
    return (
        <div className={`${classes}`}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                id={inputId}
                type={inputType}
                onChange={(event) => onchange(event.target.value)}
                className='form-control'
                autoComplete='off'
            />
        </div>
    )
}

export default customInput
