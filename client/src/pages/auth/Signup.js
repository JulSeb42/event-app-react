// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
    Autocomplete,
    InputImage,
    getToday,
    InputContainer,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import service from "../../components/service/cloudinary-service"
import Page from "../../components/layouts/Page"
import { Selector, SelectorContainer } from "../../components/ui/Selector"

// Data
import allCities from "../../components/data/cities.json"

// Utils
import randomAvatar from "../../components/utils/randomAvatar"

function Signup() {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cities, setCities] = useState([])
    const [city, setCity] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState("")
    const [dateBirth, setDateBirth] = useState("")
    const [gender, setGender] = useState("other")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [validation, setValidation] = useState("not-passed")

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => {
        setPassword(e.target.value)

        if (e.target.value.length > 6) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    // City
    useEffect(() => {
        setCities(allCities.map(city => `${city.name}, ${city.country}`))
    }, [])

    const [filteredCities, setFilteredCities] = useState("")

    const handleFilterLocation = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = cities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickAutocomplete = e => {
        setCity(e.target.innerText)
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

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            verified: false,
            verifyToken: getRandomString(20),
            city,
            gender,
            imageUrl: imageUrl === "" ? randomAvatar(gender) : imageUrl,
            dateBirth,
        }

        axios
            .put("/auth/signup", requestBody)
            .then(res => {
                loginUser(res.data)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Signup" template="form">
            <Font.H1>Signup</Font.H1>

            <Form
                onSubmit={handleSubmit}
                btnprimary="Create your account"
                loading={isLoading}
            >
                <Input
                    label="Full name"
                    type="text"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                    autoFocus
                />

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    inputtype="password"
                    onChange={handlePassword}
                    value={password}
                    password
                    validationText="Your password must be at least 6 characters long"
                    validation={validation}
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
                        />

                        <Selector
                            label="Woman"
                            id="female"
                            name="gender"
                            value="woman"
                            onChange={handleGenderWoman}
                        />

                        <Selector
                            label="Other"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleGenderOther}
                        />
                    </SelectorContainer>
                </InputContainer>

                <InputImage
                    label="Profile picture"
                    src={picture}
                    onChange={e => handleFileUpload(e)}
                    id="image"
                />
            </Form>

            <Font.P>
                You already have an account? <Link to="/login">Login</Link>
            </Font.P>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default Signup
