// Packages
import React, { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Textarea from "../../components/forms/Textarea"
import Toggle from "../../components/forms/Toggle"
import service from "../../api/service-event"
import DangerZone from "../../components/forms/DangerZone"
import Error from "../../components/forms/Error"
import Grid from "../../components/forms/Grid"
import ListUsers from "../../components/forms/ListUsers"

const API_URL = "http://localhost:5005"

function EditEvent({ edited, setEdited, ...props }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // List users
    const [allUsers, setAllUsers] = useState([])
    const [query, setQuery] = useState("")

    // Inputs
    const [title, setTitle] = useState(props.event.title)
    const [location, setlocation] = useState(props.event.location)
    const [visibility, setVisibility] = useState(props.event.visibility)
    const [startDate, setStartDate] = useState(props.event.startDate)
    const [endDate, setEndDate] = useState(props.event.endDate)
    const [startTime, setStartTime] = useState(props.event.startTime)
    const [endTime, setEndTime] = useState(props.event.endTime)
    const [description, setDescription] = useState(props.event.description)
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState(props.event.imageUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [invitedPeople, setInvitedPeople] = useState(
        props.event.invitedPeople
    )
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Search users
    useEffect(() => {
        axios
            .get(`${API_URL}/users/users`)
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

    const handleSearch = e => setQuery(e.target.value)

    let results = filteredUsers.filter(user => {
        return user.fullName.toLowerCase().includes(query)
    })

    // Handle inputs
    const handleTitle = e => setTitle(e.target.value)
    const handleLocation = e => setlocation(e.target.value)

    const handleVisibility = e => {
        if (e.target.checked) {
            setVisibility("public")
        } else {
            setVisibility("private")
        }
    }

    const handleStartDate = e => setStartDate(e.target.value)
    const handleEndDate = e => setEndDate(e.target.value)
    const handleStartTime = e => setStartTime(e.target.value)
    const handleEndTime = e => setEndTime(e.target.value)
    const handleDescription = e => setDescription(e.target.value)

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

    const handleInvitedPeople = e => {
        if (e.target.checked) {
            setInvitedPeople(arr => [e.target.value, ...arr])
        } else {
            setInvitedPeople(invitedPeople.filter(id => id !== e.target.value))
        }
    }

    // Submit
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            location,
            visibility,
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            imageUrl,
            invitedPeople,
        }

        axios
            .put(`${API_URL}/events/event/${props.event._id}/edit`, requestBody)
            .then(res => {
                setEdited(!edited)
                navigate(`/events/${props.event._id}`)
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return props.event.organiser._id !== user._id ? (
        <Navigate to={`/events/${props.event._id}`} />
    ) : (
        <Page title={`Edit ${props.event.title}`}>
            <Font.H1>Edit {props.event.title}</Font.H1>

            <Form
                btnPrimary="Saves changes"
                btnCancel={`/events/${props.event._id}`}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                <img src={picture} alt={title} />

                <Input
                    label="Cover"
                    type="file"
                    onChange={e => handleFileUpload(e)}
                />

                <Input
                    label="Title"
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

                <Toggle
                    label={`Visibility ${visibility}`}
                    id="visibility"
                    onChange={handleVisibility}
                    defaultChecked={visibility === "public" && true}
                />

                <Grid>
                    <Input
                        label="Start date"
                        type="date"
                        id="startDate"
                        onChange={handleStartDate}
                        value={startDate}
                    />

                    <Input
                        label="End date"
                        type="date"
                        id="endDate"
                        onChange={handleEndDate}
                        value={endDate}
                    />
                </Grid>

                <Grid>
                    <Input
                        label="Start time"
                        type="time"
                        id="startTime"
                        onChange={handleStartTime}
                        value={startTime}
                    />

                    <Input
                        label="End time"
                        type="time"
                        id="endTime"
                        onChange={handleEndTime}
                        value={endTime}
                    />
                </Grid>

                <Textarea
                    label="Description"
                    id="description"
                    onChange={handleDescription}
                    value={description}
                />

                <ListUsers
                    handleSearch={handleSearch}
                    valueSearch={query}
                    results={results}
                    handleInvitedPeople={handleInvitedPeople}
                    invitedPeople={invitedPeople}
                    edit
                />
            </Form>

            {errorMessage && <Error>{errorMessage}</Error>}

            <DangerZone event eventId={props.event._id} />
        </Page>
    )
}

export default EditEvent
