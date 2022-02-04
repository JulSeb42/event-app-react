// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    CheckInput,
    getToday,
    Grid,
    Variables,
    Alert,
} from "components-react-julseb"
import { useNavigate, Navigate } from "react-router-dom"

// Packages
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import InputCover from "../../components/ui/InputCover"
import InvitePeople from "../../components/ui/InvitePeople"
import service from "../../components/service/cloudinary-service"
import DangerZone from "../../components/DangerZone"

function EditEvent({ event, edited, setEdited }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState(event.title)
    const [location, setLocation] = useState(event.location)
    const [startDate, setStartDate] = useState(event.startDate)
    const [endDate, setEndDate] = useState(event.endDate)
    const [startTime, setStartTime] = useState(event.startTime)
    const [endTime, setEndTime] = useState(event.endTime)
    const [price, setPrice] = useState(event.price)
    const [imageUrl, setImageUrl] = useState(event.imageUrl)
    const [picture, setPicture] = useState(event.imageUrl)
    const [description, setDescription] = useState(event.description)
    const [isPrivate, setIsPrivate] = useState(event.isPrivate)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Handles
    const handleTitle = e => setTitle(e.target.value)
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
    const [invitedPeople, setInvitedPeople] = useState(event.invitedPeople)
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
            invitedPeople: Array.from(new Set(invitedPeople)),
        }

        axios
            .put(`/events/event/${event._id}/edit`, requestBody)
            .then(res => {
                navigate(`/events/${event._id}`)
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    const handleDelete = e => {
        axios
            .delete(`/events/delete-event/${event._id}`)
            .then(() => navigate("/my-account"))
            .catch(err => console.log(err))
    }

    return user._id !== event.organiser._id ? (
        <Navigate to={`/events/${event._id}`} />
    ) : (
        <Page title={`Edit ${event.title}`} template="form">
            <Font.H1>Edit {event.title}</Font.H1>

            <Form
                btnprimary="Edit event"
                btncancel={`/events/${event._id}`}
                onSubmit={handleSubmit}
                loading={isLoading}
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
                    edit
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <DangerZone
                onClickPrimary={handleDelete}
                textbtnopen="Delete this event"
                text="Are you sure you want to delete this event?"
                textbtndelete="Yes, delete the event"
            />
        </Page>
    )
}

export default EditEvent
