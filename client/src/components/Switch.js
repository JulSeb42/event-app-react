// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"

// Pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Search from "../pages/Search"

// Auth
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// User
import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Events
import NewEvent from "../pages/events/NewEvent"
import EventDetail from "../pages/events/EventDetail"
import EditEvent from "../pages/events/EditEvent"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [edited, setEdited] = useState(false)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))

        axios
            .get("/events/events")
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                }
            />

            {/* Search */}
            <Route
                path="/search/:keyword"
                element={<Search />}
            />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/login/forgot-password" element={<ForgotPassword />} />

            <Route
                path="/login/forgot-password/email-sent"
                element={<ForgotSent />}
            />

            <Route
                path="/thank-you"
                element={
                    <ProtectedRoutes>
                        <ThankYou />
                    </ProtectedRoutes>
                }
            />

            {allUsers.map(user => (
                <Route
                    path={`/verify/${user.verifyToken}/${user._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <Verify edited={edited} setEdited={setEdited} />
                        </ProtectedRoutes>
                    }
                    key={`${user.verifyToken}/${user._id}`}
                />
            ))}

            {allUsers.map(user => (
                <Route
                    path={`/reset-password/${user.resetToken}/${user._id}`}
                    element={<ResetPassword />}
                    key={`${user.resetToken}-${user._id}`}
                />
            ))}

            <Route path="/goodbye" element={<Goodbye />} />

            {/* User */}
            <Route
                path="/my-account"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <MyAccount />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/my-account/edit"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditAccount edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/my-account/edit-password"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditPassword edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />

            {/* Events */}
            <Route path="/events" element={<Navigate to="/" />} />

            <Route
                path="/events/new-event"
                element={
                    <ProtectedRoutes>
                        <NewEvent edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />

            {allEvents.map(event => (
                <Route
                    path={`/events/${event._id}`}
                    element={
                        <ProtectedRoutes>
                            <EventDetail event={event} />
                        </ProtectedRoutes>
                    }
                    key={event._id}
                />
            ))}

            {allEvents.map(event => (
                <Route
                    path={`/events/${event._id}/edit`}
                    element={
                        <ProtectedRoutes>
                            <EditEvent event={event} />
                        </ProtectedRoutes>
                    }
                    key={event._id}
                />
            ))}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Switch
