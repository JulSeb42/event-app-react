// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import Switch from "./components/Switch"
import Header from "./components/layouts/Header"

function App() {
    const location = useLocation().pathname
    const conditionLocation = location === "/login" || location === "/signup"
    
    return (
        <>
            {!conditionLocation && <Header />}

            <Switch />
        </>
    )
}

export default App
