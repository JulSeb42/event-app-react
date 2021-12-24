// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

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
        <div>
            <h1>Edit your password</h1>

            <Form
                btnPrimary="Save your password"
                btnCancel="/my-account"
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

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default EditPassword
