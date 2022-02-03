// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Font, getFirstName } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

function Seed(props) {
    const [allUsers, setAllUsers] = useState([])
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))

        axios
            .get("/events/events")
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Page title="Seed">
            <Font.H1>Seed</Font.H1>

            {/* <ul>
                {allUsers.map(user => (
                    <li key={user._id}>"{user._id}",</li>
                ))}
            </ul> */}

            <ul>
                {allEvents.map(event => (
                    <li key={event._id}>
                        const id{getFirstName(event.organiser.fullName)} = "
                        {event.organiser._id}"
                        <br />
                        const events{getFirstName(event.organiser.fullName)} = [
                        "{event._id}", ]
                        <br />
                        <br />
                        User.findOneAndUpdate(&#123; _id: id
                        {getFirstName(event.organiser.fullName)} &#125;, &#123;
                        $push: &#123; organisedEvents: events
                        {getFirstName(event.organiser.fullName)}
                        &#125;&#125;, &#123; new: true &#125;)
                        <br />
                        .then(events =&gt; &#123;
                        <br />
                        console.log(events)
                        <br />
                        &#125;)
                        <br />
                        .catch(err =&gt; console.log(err))
                        <br />
                        <br />
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default Seed
