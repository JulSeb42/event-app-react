// Packages
import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../user/ProfilePicture"

function Header() {
    const { logoutUser, user } = useContext(AuthContext)
    
    return (
        <header>
            <Link to="/">Event app</Link>

            <nav>
                <NavLink to="/">Home</NavLink>

                <button>
                    <ProfilePicture src={user.imageUrl} alt={user.fullName} size={32} />
                    <span>{user.fullName}</span>
                </button>

                <NavLink to="/my-account">Profile</NavLink>
                <NavLink to="/my-account/edit">Edit account</NavLink>
                <button onClick={logoutUser}>Log out</button>
            </nav>
        </header>
    )
}

export default Header
