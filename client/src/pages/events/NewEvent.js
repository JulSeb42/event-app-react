// Packages
import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Grid,
    Variables,
    getToday,
    CheckInput,
    Alert,
    // getTimeNow,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import InputCover from "../../components/ui/InputCover"
import InvitePeople from "../../components/ui/InvitePeople"
import service from "../../components/service/cloudinary-service"

// Utils
import getNow from "../../components/utils/getNow"

// organiser,
// visibility,
// invitedPeople,

function NewEvent(props) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState(getToday())
    const [endDate, setEndDate] = useState(getToday())
    const [startTime, setStartTime] = useState(getNow(0))
    const [endTime, setEndTime] = useState(getNow(1))
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState("")
    const [description, setDescription] = useState("")
    const [isPrivate, setIsPrivate] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Handles
    const handleTitle = e => {
        setTitle(e.target.value)
    }
    const handleLocation = e => setLocation(e.target.value)
    const handleStartDate = e => {
        setStartDate(e.target.value)
        setEndDate(e.target.value)
    }
    const handleEndDate = e => setEndDate(e.target.value)
    const handleStartTime = e => setStartTime(e.target.value)
    const handleEndTime = e => setEndTime(e.target.value)
    const handlePrice = e => setPrice(e.target.value)

    // Search people
    const [invitedPeople, setInvitedPeople] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios
            .get(`/users/user`)
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    let filteredUsers = allUsers
        .filter(foundUsers => foundUsers._id !== user._id)
        .sort((a, b) => {
            return a.fullName > b.fullName ? 1 : -1
        })

    const handleSearch = e => setSearch(e.target.value)

    let results = filteredUsers.filter(user => {
        return user.fullName.toLowerCase().includes(search)
    })

    const handleInvitedPeople = e => {
        if (e.target.checked) {
            setInvitedPeople(arr => [e.target.value, ...arr])
        } else {
            setInvitedPeople(invitedPeople.filter(id => id !== e.target.value))
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

    // Private event
    const handlePrivate = e => {
        if (e.target.checked) {
            setIsPrivate(true)
        } else {
            setIsPrivate(false)
        }
    }

    // Submit
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            organiser: user._id,
            title,
            location,
            startDate,
            endDate,
            startTime,
            endTime,
            price,
            imageUrl,
            description,
            isPrivate,
            invitedPeople,
        }

        axios
            .post("/events/new-event", requestBody)
            .then(res => {
                console.log(res.data)
                navigate(`/events/${res.data._id}`)
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="New event" template="form">
            <Font.H1>Create a new event</Font.H1>

            <Form
                btnprimary="Create a new event"
                btncancel="/my-account"
                loading={isLoading}
                onSubmit={handleSubmit}
            >
                <Input
                    label="Name of the event"
                    id="title"
                    onChange={handleTitle}
                    value={title}
                />

                <Input
                    label="Location"
                    id="location"
                    onChange={handleLocation}
                    value={location}
                />

                <Grid col={2} gap={Variables.Margins.S}>
                    <Input
                        label="Start date"
                        id="startDate"
                        type="date"
                        min={getToday()}
                        onChange={handleStartDate}
                        value={startDate}
                    />

                    <Input
                        label="End date"
                        id="endDate"
                        type="date"
                        min={startDate}
                        onChange={handleEndDate}
                        value={endDate}
                    />
                </Grid>

                <Grid col={2} gap={Variables.Margins.S}>
                    <Input
                        label="Start time"
                        id="startTime"
                        type="time"
                        onChange={handleStartTime}
                        value={startTime}
                    />

                    <Input
                        label="End time"
                        id="endTime"
                        type="time"
                        onChange={handleEndTime}
                        value={endTime}
                    />
                </Grid>

                <Input
                    label="Price"
                    id="price"
                    type="number"
                    min={0}
                    onChange={handlePrice}
                    value={price}
                />

                <InputCover
                    label="Cover"
                    id="imageUrl"
                    src={picture}
                    alt="Cover event"
                    onChange={e => handleFileUpload(e)}
                />

                <Input
                    label="Description"
                    id="description"
                    type="markdown"
                    onChange={setDescription}
                    value={description}
                />

                <CheckInput
                    label={`Visibility: ${isPrivate ? "private" : "public"}`}
                    id="visibility"
                    toggle
                    onChange={handlePrivate}
                    defaultChecked={isPrivate}
                />

                <InvitePeople
                    handleSearch={handleSearch}
                    valueSearch={search}
                    results={results}
                    handleInvitedPeople={handleInvitedPeople}
                    invitedPeople={invitedPeople}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default NewEvent
