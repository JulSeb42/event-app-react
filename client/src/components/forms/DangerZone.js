// Packages
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Button from "../ui/Button"

const API_URL = "http://localhost:5005"

function DangerZone(props) {
    const [open, setOpen] = useState(false)
    const { user, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const display = open ? "block" : "none"
    const displayButton = !open ? "block" : "none"

    const handleDeleteAccount = () => {
        axios
            .delete(`${API_URL}/users/user/${user._id}/delete`)
            .then(() => {
                logoutUser()
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    const handleDeleteEvent = () => {
        axios
            .delete(`${API_URL}/events/event/${props.eventId}/delete`)
            .then(() => {
                navigate("/my-account")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                style={{ display: displayButton }}
            >
                Delete {props.event ? "event" : "account"}
            </Button>

            <div style={{ display: display }}>
                <p>
                    Do you want to delete{" "}
                    {props.event ? "this event" : "your account"}?
                </p>

                <div>
                    <Button
                        onClick={
                            props.event
                                ? handleDeleteEvent
                                : handleDeleteAccount
                        }
                    >
                        Yes, delete {props.event ? "this event" : "my account"}
                    </Button>
                    <Button onClick={() => setOpen(false)}>No, cancel</Button>
                </div>
            </div>
        </>
    )
}

export default DangerZone
