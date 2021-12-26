// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
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
        <div>
            {allEvents.length === 0 ? (
                <p>No event yet!</p>
            ) : (
                allEvents.map(event => <Card event={event} key={event._id} />)
            )}
        </div>
    )
}

export default Home
