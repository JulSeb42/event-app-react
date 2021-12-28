// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
import TitleButton from "../components/layouts/TitleButton"
import Button from "../components/ui/Button"
import Tabs from "../components/layouts/Tabs"
import FiltersContainer from "../components/forms/FiltersContainer"

// const API_URL = "http://localhost:5005"

function Home() {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`/events/events`)
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    // Filters
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")

    const handleTitle = e => setTitle(e.target.value)
    const handleLocation = e => setLocation(e.target.value)

    let results = allEvents
        .filter(event => {
            return (
                event.title.toLowerCase().includes(title.toLowerCase()) &&
                event.location.toLowerCase().includes(location.toLowerCase())
            )
        })

    const pastEvents = results
        .filter(event => new Date() > new Date(event.startDate))
        .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })

    const futureEvents = results
        .filter(event => new Date() < new Date(event.startDate))
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate)
        })

    return (
        <Page title="Homepage">
            <TitleButton>
                <Font.H1>All events</Font.H1>

                <Button to="/events/new-event" btnstyle="primary">
                    Add a new event
                </Button>
            </TitleButton>

            <FiltersContainer
                onChangeTitle={handleTitle}
                valueTitle={title}
                onChangeLocation={handleLocation}
                valueLocation={location}
            />

            <Tabs
                events={allEvents}
                allEvents={allEvents}
                futureEvents={futureEvents}
                pastEvents={pastEvents}
            />
        </Page>
    )
}

export default Home
