// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
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
import PublicProfile from "../pages/user/PublicProfile"

// Events
import NewEvent from "../pages/events/NewEvent"
import EventDetail from "../pages/events/EventDetail"
import EditEvent from "../pages/events/EditEvent"

const API_URL = "http://localhost:5005"

function Switch() {
    // localStorage.clear()
    const [edited, setEdited] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/users/users`)
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))
    }, [edited])

    useEffect(() => {
        axios
            .get(`${API_URL}/events/events`)
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

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
            {allUsers.map(user => (
                <Route
                    path={`/user/${user._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <PublicProfile user={user} />
                        </ProtectedRoutes>
                    }
                    preload={scrollToTop()}
                    key={user._id}
                />
            ))}

            {/* Events */}
            <Route
                path="/events"
                element={<Navigate to="/" />}
                preload={scrollToTop()}
            />
            
            <Route
                path="/events/new-event"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <NewEvent />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            {allEvents.map(event => (
                <Route
                    path={`/events/${event._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <EventDetail event={event} />
                        </ProtectedRoutes>
                    }
                    preload={scrollToTop()}
                    key={event._id}
                />
            ))}
            {allEvents.map(event => (
                <Route
                    path={`/events/${event._id}/edit`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <EditEvent
                                event={event}
                                edited={edited}
                                setEdited={setEdited}
                            />
                        </ProtectedRoutes>
                    }
                    preload={scrollToTop()}
                    key={`${event.title}-${event._id}`}
                />
            ))}

            {/* 404 */}
            <Route path="*" element={<ErrorPage />} preload={scrollToTop()} />
        </Routes>
    )
}

export default Switch
