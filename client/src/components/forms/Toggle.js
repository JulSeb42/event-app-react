// Packages
import React from "react"

function Toggle(props) {
    return (
        <div>
            <input
                type="checkbox"
                id={props.id}
                name={props.name || props.id}
                {...props}
            />
            
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default Toggle
