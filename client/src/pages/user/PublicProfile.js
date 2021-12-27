// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import List from "../../components/events/List"
// import Card from "../../components/events/Card"
import CardProfile from "../../components/user/CardProfile"
import Item from "../../components/layouts/Item"
import Tabs from "../../components/layouts/Tabs"

// Utils
// import getFirstName from "../../components/utils/getFirstName"

const API_URL = "http://localhost:5005"

function PublicProfile(props) {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/events/events`)
            .then(res => setAllEvents(res.data))
    }, [])

    const organisedEvents = allEvents.filter(
        event =>
            event.organiser._id === props.user._id &&
            event.visibility === "public"
    )

    const invitedEvents = allEvents.filter(event =>
        event.invitedPeople.some(e => e._id === props.user._id)
    )
    const publicInvited = invitedEvents.filter(
        event => event.visibility === "public"
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

    const invitedPastEvents = publicInvited
        .filter(event => new Date() > new Date(event.startDate))
        .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })

    const invitedFutureEvents = publicInvited
        .filter(event => new Date() < new Date(event.startDate))
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate)
        })

    return (
        <Page title={props.user.fullName}>
            <CardProfile user={props.user} />

            <Font.H2>Events</Font.H2>

            <Item>
                <Font.H3>
                    {props.user.gender === "man"
                        ? "His"
                        : props.user.gender === "woman"
                        ? "Her"
                        : "Their"}{" "}
                    events
                </Font.H3>

                {/* {organisedEvents.length > 0 ? (
                    <List>
                        {organisedEvents
                            .sort((a, b) => {
                                return (
                                    new Date(a.startDate) -
                                    new Date(b.startDate)
                                )
                            })
                            .map(event => (
                                <Card event={event} key={event._id} />
                            ))}
                    </List>
                ) : (
                    <Font.P>
                        {getFirstName(props.user.fullName)} did not organise any
                        event yet!
                    </Font.P>
                )} */}
                <Tabs
                    events={organisedEvents}
                    allEvents={organisedEvents}
                    futureEvents={organisedFutureEvents}
                    pastEvents={organisedPastEvents}
                    name="organisedEvents"
                    idFutureEvents="futureEventsOrganised"
                    idPastEvents="pastEventsOrganised"
                />
            </Item>

            <Item>
                <Font.H3>
                    Events{" "}
                    {props.user.gender === "man"
                        ? "he is"
                        : props.user.gender === "woman"
                        ? "she is"
                        : "they are"}{" "}
                    invited to
                </Font.H3>

                {/* {publicInvited.length > 0 ? (
                    <List>
                        {publicInvited
                            .sort((a, b) => {
                                return (
                                    new Date(a.startDate) -
                                    new Date(b.startDate)
                                )
                            })
                            .map(event => (
                                <Card event={event} key={event._id} />
                            ))}
                    </List>
                ) : (
                    <Font.P>
                        {getFirstName(props.user.fullName)} is not invited to
                        any event yet!
                    </Font.P>
                )} */}
                <Tabs
                    events={invitedEvents}
                    allEvents={invitedEvents}
                    futureEvents={invitedFutureEvents}
                    pastEvents={invitedPastEvents}
                    name="invitedEvent"
                    idFutureEvents="futureEventsInvited"
                    idPastEvents="pastEventsInvited"
                />
            </Item>
        </Page>
    )
}

export default PublicProfile
