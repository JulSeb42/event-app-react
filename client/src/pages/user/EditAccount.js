// Packages
import React, { useContext, useState } from "react"
import Link from "../../components/utils/LinkScroll"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Textarea from "../../components/forms/Textarea"
import DangerZone from "../../components/forms/DangerZone"
import service from "../../api/service"
// import ProfilePicture from "../../components/user/ProfilePicture"
import InputProfilePicture from "../../components/forms/InputProfilePicture"
import Error from "../../components/forms/Error"
import { Selector, SelectorContainer } from "../../components/forms/Selector"

// const API_URL = "http://localhost:5005"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [gender, setGender] = useState(user.gender)
    const [dateBirth, setDateBirth] = useState(user.dateBirth)
    const [city, setCity] = useState(user.city)
    const [bio, setBio] = useState(user.bio !== undefined ? user.bio : "")
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

    // Profile picture
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState(user.imageUrl)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setPicture(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            gender,
            dateBirth,
            city,
            bio,
            id: user._id,
            imageUrl,
        }

        axios
            .put(`/users/user/edit`, requestBody)
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
        <Page title={`Edit ${user.fullName}`}>
            <Font.H1>Edit your account</Font.H1>

            <Font.P>
                <Link to="/my-account/edit-password">Edit your password</Link>
            </Font.P>

            <Form
                btnPrimary="Save changes"
                btnCancel="/my-account"
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                <InputProfilePicture src={picture} alt={user.fullName} onChange={e => handleFileUpload(e)} id="imageUrl" />

                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input label="Email" id="email" disabled value={user.email} />

                <SelectorContainer label="Gender">
                    <Selector
                        label="man"
                        id="man"
                        type="radio"
                        name="gender"
                        onChange={handleGenderMale}
                        defaultChecked={gender === "man" && true}
                    />

                    <Selector
                        label="woman"
                        id="woman"
                        type="radio"
                        name="gender"
                        onChange={handleGenderFemale}
                        defaultChecked={gender === "woman" && true}
                    />

                    <Selector
                        label="other"
                        id="other"
                        type="radio"
                        name="gender"
                        onChange={handleGenderOther}
                        defaultChecked={gender === "other" && true}
                    />
                </SelectorContainer>

                <Input
                    type="date"
                    label="Date of birth"
                    id="dateBirth"
                    onChange={handleDateBirth}
                    value={dateBirth}
                    dateBirth
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
                    counter={140}
                />
            </Form>

            {errorMessage && <Error>{errorMessage}</Error>}

            <DangerZone />
        </Page>
    )
}

export default EditAccount
