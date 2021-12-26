// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
import List from "../components/events/List"
import Card from "../components/events/Card"

const API_URL = "http://localhost:5005"

function Home() {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/events/events`)
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Page title="Homepage">
            <Font.H1>All events</Font.H1>

            {allEvents.length === 0 ? (
                <Font.P>No event yet!</Font.P>
            ) : (
                <List>
                    {allEvents
                        .sort((a, b) => {
                            return new Date(a.startDate) - new Date(b.startDate)
                        })
                        .map(event => (
                            <Card event={event} key={event._id} />
                        ))}
                </List>
            )}
        </Page>
    )
}

export default Home
