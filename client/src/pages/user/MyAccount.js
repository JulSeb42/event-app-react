// Packages
import React, { useState, useContext, useEffect } from "react"
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
} from "components-react-julseb"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import UserCard from "../../components/user/UserCard"
import CardEvent from "../../components/event/CardEvent"

const datesEvents = ["Future events", "Past events"]

function MyAccount() {
    const { user } = useContext(AuthContext)
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios.get(`/events/events`).then(res => setAllEvents(res.data))
    }, [])

    const organisedEvents = allEvents.filter(
        event => event.organiser._id === user._id
    )
    const invitedEvents = allEvents.filter(event =>
        event.invitedPeople.some(e => e._id === user._id)
    )

    const organisedPastEvents = organisedEvents
        .filter(event => new Date() > new Date(event.startDate))
        .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })

    const organisedFutureEvents = organisedEvents
        .filter(event => new Date() < new Date(event.startDate))
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate)
        })

    const invitedPastEvents = invitedEvents
        .filter(event => new Date() > new Date(event.startDate))
        .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })

    const invitedFutureEvents = invitedEvents
        .filter(event => new Date() < new Date(event.startDate))
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate)
        })

    const [organisedActive, setOrganisedActive] = useState(0)
    const [invitedActive, setInvitedActive] = useState(0)

    return (
        <Page title={user.fullName}>
            <UserCard user={user} welcome />
            {!user.verified && <Font.P>Your account is not verified.</Font.P>}
            <TitleFlex>
                <Font.H2>Events</Font.H2>

                <Button to="/events/new-event">Add a new event</Button>
            </TitleFlex>
            <Font.H3>Events you organise</Font.H3>

            <TabsContainer>
                <TabsButtonsContainer col={datesEvents.length}>
                    {datesEvents.map((date, i) => (
                        <TabsButton
                            onClick={() => setOrganisedActive(i)}
                            className={organisedActive === i ? "active" : ""}
                            key={i}
                        >
                            {date}
                        </TabsButton>
                    ))}
                </TabsButtonsContainer>

                <TabsContent className={organisedActive === 0 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {organisedFutureEvents.length > 0 ? (
                            organisedFutureEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No future event yet.</Font.P>
                        )}
                    </Grid>
                </TabsContent>

                <TabsContent className={organisedActive === 1 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {organisedPastEvents.length > 0 ? (
                            organisedPastEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No past event yet.</Font.P>
                        )}
                    </Grid>
                </TabsContent>
            </TabsContainer>

            <Font.H3>Events you are invited to</Font.H3>

            <TabsContainer>
                <TabsButtonsContainer col={datesEvents.length}>
                    {datesEvents.map((date, i) => (
                        <TabsButton
                            onClick={() => setInvitedActive(i)}
                            className={invitedActive === i ? "active" : ""}
                            key={i}
                        >
                            {date}
                        </TabsButton>
                    ))}
                </TabsButtonsContainer>

                <TabsContent className={invitedActive === 0 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {invitedFutureEvents.length > 0 ? (
                            invitedFutureEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No future event yet.</Font.P>
                        )}
                    </Grid>
                </TabsContent>

                <TabsContent className={invitedActive === 1 ? "active" : ""}>
                    <Grid gap={Variables.Margins.M}>
                        {invitedPastEvents.length > 0 ? (
                            invitedPastEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))
                        ) : (
                            <Font.P>No past event yet.</Font.P>
                        )}
                    </Grid>
                </TabsContent>
            </TabsContainer>
        </Page>
    )
}

export default MyAccount
