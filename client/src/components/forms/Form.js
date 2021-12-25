// Packages
import React from "react"

// Components
import Button from "../ui/Button"

function Form(props) {
    return (
        <form {...props}>
            {props.children}

            <div>
                {props.btnPrimary && (
                    <Button type="submit" isLoading={props.isLoading}>{props.btnPrimary}</Button>
                )}

                {props.btnCancel && (
                    <Button to={props.btnCancel}>Cancel</Button>
                )}
            </div>
        </form>
    )
}

export default Form
