// Packages
import React from "react"

function Input(props) {
    return (
        <div>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}

            <input id={props.id} name={props.name || props.id} {...props} />
        </div>
    )
}

export default Input
