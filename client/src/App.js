// Packages
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"

// Components
import { AuthContext } from "./context/auth"
import Switch from "./components/Switch"
import Header from "./components/layouts/Header"

function App() {
    const location = useLocation().pathname
    const conditionLocation = location === "/login" || location === "/signup"
    const { isLoggedIn } = useContext(AuthContext)
    
    return (
        <>
            {!conditionLocation && isLoggedIn && <Header />}

            <Switch />
        </>
    )
}

export default App
