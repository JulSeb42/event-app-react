// Packages
import React from "react"
import { Link } from "react-router-dom"

// Utils
import scrollToTop from "./scrollToTop"

function LinkScroll(props) {
    return <Link onClick={scrollToTop} {...props}>{props.children}</Link>
}

export default LinkScroll
