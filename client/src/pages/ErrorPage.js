// Packages
import React, { useContext } from "react"
import Link from "../components/utils/LinkScroll"
import { Navigate } from "react-router-dom"

// Components
import { AuthContext } from "../context/auth"

function ErrorPage(props) {
    const { isLoggedIn } = useContext(AuthContext)
    
    return !isLoggedIn ? (
        <Navigate to="/login" />
    ) : (
        <div>
            <h1>Not found!</h1>

            <p>
                This page does not exist.{" "}
                <Link to="/">Go back to homepage</Link>
            </p>
        </div>
    )
}

export default ErrorPage
