// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Error from "../../components/forms/Error"

const API_URL = "http://localhost:5005"

function EditPassword({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handlePassword = e => setPassword(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id: user._id, password }

        axios
            .put(`${API_URL}/users/user/edit-password`, requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Edit your password">
            <Font.H1>Edit your password</Font.H1>

            <Form
                btnPrimary="Save your password"
                btnCancel="/my-account/edit"
                onSubmit={handleSubmit}
            >
                <Input
                    label="New password"
                    inputtype="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            {errorMessage && <Error>{errorMessage}</Error>}
        </Page>
    )
}

export default EditPassword
