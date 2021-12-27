// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
import TitleButton from "../components/layouts/TitleButton"
import Button from "../components/ui/Button"
import Tabs from "../components/layouts/Tabs"

const API_URL = "http://localhost:5005"

function Home() {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/events/events`)
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    const pastEvents = allEvents
        .filter(event => new Date() > new Date(event.startDate))
        .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })

    const futureEvents = allEvents
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
