// Packages
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
    Font,
    TitleFlex,
    Button,
    TabsContainer,
    TabsButtonsContainer,
    TabsButton,
    TabsContent,
    Grid,
    Variables,
    CheckInput,
} from "components-react-julseb"
import styled from "styled-components"

// Components
import { AuthContext } from "../context/auth"
import Page from "../components/layouts/Page"
import CardEvent from "../components/event/CardEvent"

const datesEvents = ["All", "Future events", "Past events"]

// Styles
const ContentTab = styled(TabsContent)`
    margin-top: ${Variables.Margins.M};
`

function Home() {
    const { user } = useContext(AuthContext)
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get("/events/events")
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }, [])

    const sortedEvents = allEvents.sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
    )

    // Filter events
    const [showEvents, setShowEvents] = useState([])

    useEffect(() => {
        setShowEvents(
            sortedEvents.filter(
                event =>
                    event.organiser._id === user._id ||
                    event.invitedPeople
                        .map(users => users._id)
                        .includes(user._id) ||
                    event.isPrivate === false
            )
        )
    }, [sortedEvents, user._id])

    const pastEvents = showEvents.filter(
        event => new Date() > new Date(event.startDate)
    )

    const futureEvents = showEvents.filter(
        event => new Date() < new Date(event.startDate)
    )

    const handleFree = e => {
        if (e.target.checked) {
            setShowEvents(
                sortedEvents
                    .filter(
                        event =>
                            event.organiser._id === user._id ||
                            event.invitedPeople
                                .map(users => users._id)
                                .includes(user._id) ||
                            event.isPrivate === false
                    )
                    .filter(event => event.price === 0)
            )
        } else {
            setShowEvents(
                sortedEvents.filter(
                    event =>
                        event.organiser._id === user._id ||
                        event.invitedPeople
                            .map(users => users._id)
                            .includes(user._id) ||
                        event.isPrivate === false
                )
            )
        }
    }

    // Tabs
    const [active, setActive] = useState(0)

    return (
        <Page title="Home">
            <TitleFlex>
                <Font.H1>All events</Font.H1>

                <Button to="/events/new-event">Create a new event</Button>
            </TitleFlex>

            <CheckInput
                label="Only show free events"
                id="freeEvents"
                type="checkbox"
                toggle
                onChange={handleFree}
            />

            <TabsContainer>
                <TabsButtonsContainer col={datesEvents.length}>
                    {datesEvents.map((date, i) => (
                        <TabsButton
                            onClick={() => setActive(i)}
                            className={active === i ? "active" : ""}
                            key={i}
                        >
                            {date}
                        </TabsButton>
                    ))}
                </TabsButtonsContainer>

                <ContentTab className={active === 0 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {showEvents.length > 0 ? (
                            showEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No event yet.</Font.P>
                        )}
                    </Grid>
                </ContentTab>

                <ContentTab className={active === 1 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {futureEvents.length > 0 ? (
                            futureEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No future event yet.</Font.P>
                        )}
                    </Grid>
                </ContentTab>

                <ContentTab className={active === 2 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {pastEvents.length > 0 ? (
                            pastEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No past event yet.</Font.P>
                        )}
                    </Grid>
                </ContentTab>
            </TabsContainer>
        </Page>
    )
}

export default Home
