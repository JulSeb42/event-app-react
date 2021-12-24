// Packages
import React, { useContext, useState } from "react"
import Link from "../../components/utils/LinkScroll"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

// Utils
import randomAvatar from "../../components/utils/randomAvatar"

const API_URL = "http://localhost:5005"

function Signup() {
    const { loginUser, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dateBirth, setDateBirth] = useState("")
    const [city, setCity] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleGenderMale = e => {
        if (e.target.checked) {
            setGender("man")
        }
    }

    const handleGenderFemale = e => {
        if (e.target.checked) {
            setGender("woman")
        }
    }

    const handleGenderOther = e => {
        if (e.target.checked) {
            setGender("other")
        }
    }

    const handleDateBirth = e => setDateBirth(e.target.value)
    const handleCity = e => setCity(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            gender,
            dateBirth,
            city,
            imageUrl: randomAvatar(gender),
        }

        axios
            .put(`${API_URL}/auth/signup`, requestBody)
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
            <h1>Signup</h1>
            <Form btnPrimary="Signup" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

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
                    type="password"
                    onChange={handlePassword}
                    value={password}
                />

                <div>
                    <p>Gender</p>

                    <Input
                        label="man"
                        id="man"
                        type="radio"
                        name="gender"
                        onChange={handleGenderMale}
                    />

                    <Input
                        label="woman"
                        id="woman"
                        type="radio"
                        name="gender"
                        onChange={handleGenderFemale}
                    />

                    <Input
                        label="other"
                        id="other"
                        type="radio"
                        name="gender"
                        onChange={handleGenderOther}
                    />
                </div>

                <Input
                    label="Date of birth"
                    id="dateBirth"
                    type="date"
                    onChange={handleDateBirth}
                    value={dateBirth}
                />

                <Input
                    label="City"
                    id="city"
                    onChange={handleCity}
                    value={city}
                />
            </Form>

            {errorMessage && <p>{errorMessage}</p>}

            <p>
                You already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Signup
