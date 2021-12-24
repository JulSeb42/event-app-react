// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"
import scrollToTop from "../components/utils/scrollToTop"

// Pages
import Home from "../pages/Home"
import ErrorPage from "../pages/ErrorPage"

// Login
import Login from "../pages/login/Login"
import Signup from "../pages/login/Signup"

// User
import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

const API_URL = "http://localhost:5005"

function Switch() {
    // localStorage.clear()
    const [edited, setEdited] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/users/users`)
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))
    }, [edited])

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

            {/* User */}
            <Route
                path="/my-account"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <MyAccount />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/my-account/edit"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditAccount edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/my-account/edit-password"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditPassword edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />

            {/* 404 */}
            <Route path="*" element={<ErrorPage />} preload={scrollToTop()} />
        </Routes>
    )
}

export default Switch
