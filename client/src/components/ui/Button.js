// Packages
import React from "react"
import Link from "../utils/LinkScroll"
import Loader from "./Loader"

function Button(props) {
    return props.to ? (
        <Link to={props.to} {...props}>
            {props.children}
        </Link>
    ) : (
        <button {...props}>
            {props.children}

            {props.isLoading && <Loader spinnerColor="black" />}
        </button>
    )
}

export default Button
