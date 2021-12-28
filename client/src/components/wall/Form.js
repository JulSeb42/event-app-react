// Packages
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"

// Components
import Textarea from "../forms/Textarea"
import FormComponent from "../forms/Form"
import ButtonsContainer from "../forms/ButtonsContainer"
import Button from "../ui/Button"
import { AuthContext } from "../../context/auth"
import Error from "../forms/Error"

// Utils
import getTimeNow from "../utils/getTimeNow"
import getToday from "../utils/getToday"

// Styles
const FormStyled = styled(FormComponent)`
    display: ${props => props.open};
`

const ButtonOpen = styled(Button)`
    padding-left: 0;
    padding-right: 0;
    display: ${props => props.open};
`

// const API_URL = "http://localhost:5005"

function Form(props) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "grid" : "none"
    const btnOpen = !isOpen ? "flex" : "none"

    const { user } = useContext(AuthContext)

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleMessage = e => setMessage(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            message,
            poster: user._id,
            event: props.eventId,
            datePost: getToday(),
            timePost: getTimeNow(),
        }

        axios
            .put(`/posts/post/new-post`, requestBody)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <>
            <ButtonOpen
                btnstyle="secondary"
                justify="start"
                open={btnOpen}
                onClick={() => setIsOpen(true)}
            >
                Post a message on the wall
            </ButtonOpen>

            <FormStyled open={open} onSubmit={handleSubmit}>
                <Textarea
                    label="Type your message"
                    id="post"
                    value={message}
                    onChange={handleMessage}
                />

                <ButtonsContainer>
                    <Button type="submit" btnstyle="primary">
                        Send
                    </Button>

                    <Button
                        type="reset"
                        btnstyle="secondary"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </ButtonsContainer>
            </FormStyled>

            {errorMessage && <Error>{errorMessage}</Error>}
        </>
    )
}

export default Form
