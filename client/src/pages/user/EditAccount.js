// Packages
import React, { useContext, useState } from "react"
import Link from "../../components/utils/LinkScroll"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Textarea from "../../components/forms/Textarea"
import DangerZone from "../../components/forms/DangerZone"

const API_URL = "http://localhost:5005"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [gender, setGender] = useState(user.gender)
    const [dateBirth, setDateBirth] = useState(user.dateBirth)
    const [city, setCity] = useState(user.city)
    const [bio, setBio] = useState(user.bio)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)

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
    const handleBio = e => setBio(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            gender,
            dateBirth,
            city,
            bio,
            id: user._id,
        }

        axios
            .put(`${API_URL}/users/user/edit`, requestBody)
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
            <h1>Edit your account</h1>

            <p>
                <Link to="/my-account/edit-password">Edit your password</Link>
            </p>

            <p>
                <Link to="/my-account/edit-picture">
                    Edit your profile picture
                </Link>
            </p>

            <Form btnPrimary="Save changes" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input label="Email" id="email" disabled value={user.email} />

                <div>
                    <p>Gender</p>

                    <Input
                        label="man"
                        id="man"
                        type="radio"
                        name="gender"
                        onChange={handleGenderMale}
                        defaultChecked={gender === "man" && true}
                    />

                    <Input
                        label="woman"
                        id="woman"
                        type="radio"
                        name="gender"
                        onChange={handleGenderFemale}
                        defaultChecked={gender === "woman" && true}
                    />

                    <Input
                        label="other"
                        id="other"
                        type="radio"
                        name="gender"
                        onChange={handleGenderOther}
                        defaultChecked={gender === "other" && true}
                    />
                </div>

                <Input
                    type="date"
                    label="Date of birth"
                    id="dateBirth"
                    onChange={handleDateBirth}
                    value={dateBirth}
                />

                <Input
                    label="City"
                    id="city"
                    onChange={handleCity}
                    value={city}
                />

                <Textarea
                    label="Bio"
                    id="bio"
                    onChange={handleBio}
                    value={bio}
                />
            </Form>

            {errorMessage && <p>{errorMessage}</p>}

            <DangerZone />
        </div>
    )
}

export default EditAccount
