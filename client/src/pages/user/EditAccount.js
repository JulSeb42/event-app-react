// Packages
import React, { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Alert,
    Autocomplete,
    InputContainer,
    getToday,
    InputImage,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"
import { Selector, SelectorContainer } from "../../components/ui/Selector"
import service from "../../components/service/cloudinary-service"

// Data
import allCities from "../../components/data/cities.json"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState(user.city)
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [picture, setPicture] = useState(user.imageUrl)
    const [dateBirth, setDateBirth] = useState(user.dateBirth)
    const [gender, setGender] = useState(user.gender)
    const [bio, setBio] = useState(user.bio || "")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleBio = e => setBio(e.target.value)

    // City
    useEffect(() => {
        setCities(allCities.map(city => `${city.name}, ${city.country}`))
    }, [])

    const [filteredCities, setFilteredCities] = useState("")

    const handleFilterLocation = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = cities
        .filter(city => {
            return city.toLowerCase().includes(filteredCities.toLowerCase())
        })
        

    const handleClickAutocomplete = e => {
        setCity(e.target.innerText)
    }

    // Date of birth
    const handleDateBirth = e => setDateBirth(e.target.value)

    // Gender
    const handleGenderMan = e => {
        if (e.target.checked) {
            setGender("man")
        }
    }

    const handleGenderWoman = e => {
        if (e.target.checked) {
            setGender("woman")
        }
    }

    const handleGenderOther = e => {
        if (e.target.checked) {
            setGender("other")
        }
    }

    // Upload picture
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

    // Edit account
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            id: user._id,
            fullName,
            city,
            imageUrl,
            dateBirth,
            gender,
            bio,
        }

        axios
            .put("/users/edit", requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account" template="form">
            <Font.H1>Edit your account</Font.H1>

            <Form
                btnprimary="Save changes"
                btncancel="/my-account"
                onSubmit={handleSubmit}
                loading={isLoading}
            >
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                />

                <Autocomplete
                    label="City"
                    id="city"
                    onChange={handleFilterLocation}
                    value={city}
                    items={resultsCities}
                    onMouseDown={handleClickAutocomplete}
                />

                <Input
                    label="Date of birth"
                    type="date"
                    max={getToday()}
                    id="dateBirth"
                    onChange={handleDateBirth}
                    value={dateBirth}
                />

                <InputContainer label="Gender">
                    <SelectorContainer>
                        <Selector
                            label="Man"
                            id="male"
                            name="gender"
                            value="man"
                            onChange={handleGenderMan}
                            defaultChecked={user.gender === "man" && true}
                        />

                        <Selector
                            label="Woman"
                            id="female"
                            name="gender"
                            value="woman"
                            onChange={handleGenderWoman}
                            defaultChecked={user.gender === "woman" && true}
                        />

                        <Selector
                            label="Other"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleGenderOther}
                            defaultChecked={user.gender === "other" && true}
                        />
                    </SelectorContainer>
                </InputContainer>

                <Input
                    type="textarea"
                    label="Bio"
                    id="bio"
                    onChange={handleBio}
                    value={bio}
                    counter={140}
                />

                <InputImage
                    label="Profile picture"
                    src={picture}
                    onChange={e => handleFileUpload(e)}
                    id="image"
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Font.P>
                <Link to="/my-account/edit-password">Edit your password.</Link>
            </Font.P>

            <DangerZone
                onClickPrimary={handleDelete}
                textbtnopen="Delete your account"
                text="Are you sure you want to delete your account?"
                textbtndelete="Yes, delete my account"
            />
        </Page>
    )
}

export default EditAccount
