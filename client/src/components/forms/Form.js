// Packages
import React from "react"

// Components
import Button from "../ui/Button"

function Form(props) {
    return (
        <form {...props}>
            {props.children}

            <Button type="submit">{props.btnPrimary}</Button>
        </form>
    )
}

export default Form
