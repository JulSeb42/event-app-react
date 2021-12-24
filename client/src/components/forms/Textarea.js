// Packages
import React from "react"

function Textarea(props) {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>

            <textarea
                name={props.name || props.id}
                id={props.id}
                value={props.value}
                {...props}
            >
                {props.value}
            </textarea>
        </div>
    )
}

export default Textarea
