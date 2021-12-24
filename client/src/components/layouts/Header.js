// Packages
import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"

function Header(props) {
    const { logoutUser } = useContext(AuthContext)
    return (
        <header>
            <Link to="/">Event app</Link>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/my-account">My account</NavLink>

                <button onClick={logoutUser}>Log out</button>
            </nav>
        </header>
    )
}

export default Header
