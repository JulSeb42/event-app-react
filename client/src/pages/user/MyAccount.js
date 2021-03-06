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
    PageLoading,
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

    const [isLoading, setIsLoading] = useState(true)
    const [populatedUser, setPopulatedUser] = useState({})

    useEffect(() => {
        axios
            .get(`/users/user/${user._id}`)
            .then(res => {
                setPopulatedUser(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    const [organisedActive, setOrganisedActive] = useState(0)
    const [invitedActive, setInvitedActive] = useState(0)

    const [organisedPastEvents, setOrganisedPastEvents] = useState([])
    const [organisedFutureEvents, setOrganisedFutureEvents] = useState([])
    const [invitedPastEvents, setInvitedPastEvents] = useState([])
    const [invitedFutureEvents, setInvitedFutureEvents] = useState([])

    useEffect(() => {
        if (!isLoading) {
            setOrganisedPastEvents(
                populatedUser.organisedEvents
                    .filter(event => new Date() > new Date(event.startDate))
                    .sort((a, b) => {
                        return new Date(a.startDate) - new Date(b.startDate)
                    })
            )

            setOrganisedFutureEvents(
                populatedUser.organisedEvents
                    .filter(event => new Date() < new Date(event.startDate))
                    .sort((a, b) => {
                        return new Date(a.startDate) - new Date(b.startDate)
                    })
            )

            setInvitedPastEvents(
                populatedUser.invitedEvents
                    .filter(event => new Date() > new Date(event.startDate))
                    .sort((a, b) => {
                        return new Date(a.startDate) - new Date(b.startDate)
                    })
            )

            setInvitedFutureEvents(
                populatedUser.invitedEvents
                    .filter(event => new Date() < new Date(event.startDate))
                    .sort((a, b) => {
                        return new Date(a.startDate) - new Date(b.startDate)
                    })
            )
        }
    }, [isLoading, populatedUser])

    console.log(populatedUser)

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title={populatedUser.fullName}>
            <UserCard user={populatedUser} welcome />

            {!populatedUser.verified && (
                <Font.P>Your account is not verified.</Font.P>
            )}

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
