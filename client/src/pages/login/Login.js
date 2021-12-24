// Packages
import React, { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Link from "../../components/utils/LinkScroll"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

const API_URL = "http://localhost:5005"

function Login() {
    const { loginUser, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        axios
            .put(`${API_URL}/auth/login`, requestBody)
            .then(res => {
                loginUser(res.data)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return isLoggedIn ? (
        <Navigate to="/" />
    ) : (
        <div>
            <h1>Login</h1>

            <Form btnPrimary="Login" onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    inputtype="password"
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            {errorMessage && <p>{errorMessage}</p>}

            <p>
                No account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    )
}

export default Login
