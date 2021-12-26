// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Toggle from "../../components/forms/Toggle"
import Textarea from "../../components/forms/Textarea"
import CardSmall from "../../components/user/CardSmall"
import service from "../../api/service-event"

const API_URL = "http://localhost:5005"

function NewEvent() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [visibility, setVisibility] = useState("private")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [invitedPeople, setInvitedPeople] = useState([])
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => setTitle(e.target.value)
    const handleLocation = e => setLocation(e.target.value)

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
    }

    const handleInvitedPeople = e => {
        if (e.target.checked) {
            setInvitedPeople(arr => [e.target.value, ...arr])
        } else {
            setInvitedPeople(invitedPeople.filter(id => id !== e.target.value))
        }
    }

    // Search people
    const [allUsers, setAllUsers] = useState([])
    const [query, setQuery] = useState("")

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

    // Submit
    const handleSubmit = e => {
        e.preventDefault()

        // if (imageUrl === "") return

        const requestBody = {
            title,
            location,
            startDate,
            endDate,
            startTime,
            endTime,
            organiser: user._id,
            imageUrl,
            description,
            invitedPeople,
            visibility,
        }

        axios
            .put(`${API_URL}/events/events/new-event`, requestBody)
            .then(res => {
                console.log(res.data)
                navigate(`/events/${res.data.createdEvent._id}`)
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div>
            <h1>Add a new event</h1>

            <Form
                btnPrimary="Create a new event"
                btnCancel="/my-account"
                isLoading={isLoading}
                onSubmit={handleSubmit}
            >
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
                    value={visibility}
                />

                <div>
                    <Input
                        label="Start date"
                        id="startDate"
                        type="date"
                        onChange={handleStartDate}
                        value={startDate}
                    />

                    <Input
                        label="End date"
                        id="endDate"
                        type="date"
                        onChange={handleEndDate}
                        value={endDate}
                    />
                </div>

                <div>
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
                </div>

                <Textarea
                    label="Description"
                    id="description"
                    onChange={handleDescription}
                    value={description}
                />

                <Input
                    label="Cover"
                    type="file"
                    id="imageUrl"
                    onChange={e => handleFileUpload(e)}
                />

                <div>
                    <Input
                        label="Invite people"
                        type="search"
                        id="searchUsers"
                        onChange={handleSearch}
                        value={query}
                    />

                    <ul>
                        {results.map(user => (
                            <li key={user._id}>
                                <CardSmall
                                    user={user}
                                    name="invitedPeople"
                                    onChange={handleInvitedPeople}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </Form>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default NewEvent
