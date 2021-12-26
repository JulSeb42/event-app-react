// Packages
import React, { useContext } from "react"
import { Navigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Textarea from "../../components/forms/Textarea"
import Toggle from "../../components/forms/Toggle"

function EditEvent(props) {
    const { user } = useContext(AuthContext)
    return props.event.organiser._id !== user._id ? (
        <Navigate to={`/events/${props.event._id}`} />
    ) : (
        <div>
            <h1>Edit {props.event.title}</h1>

            <Form
                btnPrimary="Saves changes"
                btnCancel={`/events/${props.event._id}`}
            >
                <img src={props.event.imageUrl} alt={props.event.title} />

                <Input label="Cover" type="file" />

                <Input label="Title" id="title" />

                <Input label="Location" id="location" />

                <Toggle label={`Visibility`} id="visibility" />

                <div>
                    <Input label="Start date" type="date" id="startDate" />

                    <Input label="End date" type="date" id="endDate" />
                </div>

                <div>
                    <Input label="Start time" type="time" id="startTime" />

                    <Input label="End time" type="time" id="endTime" />
                </div>

                <Textarea label="Description" id="description" />

                {/* Invited people */}
            </Form>
        </div>
    )
}

export default EditEvent
