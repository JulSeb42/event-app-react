// Packages
import React, { useState, useEffect } from "react"
import {
    Font,
    getFirstName,
    TabsContainer,
    TabsButtonsContainer,
    TabsButton,
    TabsContent,
    Grid,
    Variables,
} from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"
import UserCard from "../../components/user/UserCard"
import CardEvent from "../../components/event/CardEvent"

const datesEvents = ["Future events", "Past events"]

function PublicProfile({ user }) {
    const [organisedActive, setOrganisedActive] = useState(0)
    const [invitedActive, setInvitedActive] = useState(0)

    const [organisedPastEvents, setOrganisedPastEvents] = useState([])
    const [organisedFutureEvents, setOrganisedFutureEvents] = useState([])
    const [invitedPastEvents, setInvitedPastEvents] = useState([])
    const [invitedFutureEvents, setInvitedFutureEvents] = useState([])

    useEffect(() => {
        setOrganisedPastEvents(
            user.organisedEvents
                .filter(event => new Date() > new Date(event.startDate))
                .sort((a, b) => {
                    return new Date(a.startDate) - new Date(b.startDate)
                })
        )

        setOrganisedFutureEvents(
            user.organisedEvents
                .filter(event => new Date() < new Date(event.startDate))
                .sort((a, b) => {
                    return new Date(a.startDate) - new Date(b.startDate)
                })
        )

        setInvitedPastEvents(
            user.invitedEvents
                .filter(event => new Date() > new Date(event.startDate))
                .sort((a, b) => {
                    return new Date(a.startDate) - new Date(b.startDate)
                })
        )

        setInvitedFutureEvents(
            user.invitedEvents
                .filter(event => new Date() < new Date(event.startDate))
                .sort((a, b) => {
                    return new Date(a.startDate) - new Date(b.startDate)
                })
        )
    }, [user])

    return (
        <Page title={user.fullName}>
            <UserCard user={user} />

            <Font.H2>{getFirstName(user.fullName)}'s events</Font.H2>

            <Font.H3>
                Events{" "}
                {user.gender === "man"
                    ? "he "
                    : user.gender === "woman"
                    ? "she "
                    : "they "}
                organise{user.gender !== "other" && "s"}
            </Font.H3>

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

            <Font.H3>
                Events{" "}
                {user.gender === "man"
                    ? "he is "
                    : user.gender === "woman"
                    ? "she is "
                    : "they are "}
                invited to
            </Font.H3>

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

export default PublicProfile
