// Packages
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import Button from "../ui/Button"
import ButtonsContainer from "./ButtonsContainer"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    background-color: ${Variables.Colors.Danger10};
    border: 1px solid ${Variables.Colors.Danger};
    padding: ${Variables.Margins.M};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.M};
`

// const API_URL = "http://localhost:5005"

function DangerZone(props) {
    const [open, setOpen] = useState(false)
    const { user, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const display = open ? "grid" : "none"
    const displayButton = !open ? "block" : "none"

    const handleDeleteAccount = () => {
        axios
            .delete(`/users/user/${user._id}/delete`)
            .then(() => {
                logoutUser()
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    const handleDeleteEvent = () => {
        axios
            .delete(`/events/event/${props.eventId}/delete`)
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
                justify="start"
                btnstyle="danger"
            >
                Delete {props.event ? "event" : "account"}
            </Button>

            <Container style={{ display: display }}>
                <Font.P>
                    Do you want to delete{" "}
                    {props.event ? "this event" : "your account"}?
                </Font.P>

                <ButtonsContainer>
                    <Button
                        onClick={
                            props.event
                                ? handleDeleteEvent
                                : handleDeleteAccount
                        }
                        btnstyle="danger"
                    >
                        Yes, delete {props.event ? "this event" : "my account"}
                    </Button>

                    <Button onClick={() => setOpen(false)} btnstyle="secondary">No, cancel</Button>
                </ButtonsContainer>
            </Container>
        </>
    )
}

export default DangerZone
