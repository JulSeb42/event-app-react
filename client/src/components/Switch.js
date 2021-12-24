// Packages
import React from "react"
import { Routes, Route } from "react-router-dom"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"
import scrollToTop from "../components/utils/scrollToTop"

// Pages
import Home from "../pages/Home"

// Login
import Login from "../pages/login/Login"
import Signup from "../pages/login/Signup"

function Switch() {
    // localStorage.clear()
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <Home />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />

            {/* Login */}
            <Route path="/login" element={<Login />} preload={scrollToTop()} />

            <Route
                path="/signup"
                element={<Signup />}
                preload={scrollToTop()}
            />
        </Routes>
    )
}

export default Switch
