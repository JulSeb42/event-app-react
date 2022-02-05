// Packages
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import {
    Button,
    Form,
    Input,
    getToday,
    getTimeNow,
    Alert
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled(Form)`
    max-width: inherit;
    display: none;

    &.open {
        display: grid;
    }
`

const StyledInput = styled(Input)`
    min-height: 150px;
`

function PostForm(props) {
    const { user } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleMessage = e => setMessage(e.target.value)

    const handleReset = () => {
        setIsOpen(false)
        setMessage("")
    }

    const handleSubmit = e => {
        const requestBody = {
            message,
            poster: user._id,
            datePost: getToday(),
            timePost: getTimeNow(),
            event: props.event._id,
        }

        axios
            .post("/posts/new-post", requestBody)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => {const errorDescription = err.response.data.message
            setErrorMessage(errorDescription)})
    }

    return (
        <>
            <Button
                btnstyle="text"
                justify="start"
                nopadding
                onClick={() => setIsOpen(true)}
                style={{ display: isOpen ? "none" : "flex" }}
            >
                Post a message on the wall
            </Button>

            <Container
                btnprimary="Send"
                textbtnreset="Cancel"
                className={isOpen ? "open" : ""}
                onClickReset={handleReset}
                onSubmit={handleSubmit}
            >
                <StyledInput
                    type="textarea"
                    label="Your message"
                    id="message"
                    onChange={handleMessage}
                    value={message}
                />
            </Container>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </>
    )
}

export default PostForm
